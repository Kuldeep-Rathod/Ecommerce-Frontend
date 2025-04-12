import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItem';
import {
    addToCart,
    calculatePrice,
    discountApplied,
    removeCartItem,
} from '../redux/reducer/cartReducer';
import { CartReducerInitialState } from '../types/reducer-types';
import { CartItem } from '../types/types';
import axios from 'axios';
import { server } from '../redux/store';

const Cart = () => {
    const { cartItems, subTotal, tax, discount, total, shippingCharges } =
        useSelector(
            (state: { cartReducer: CartReducerInitialState }) =>
                state.cartReducer
        );

    const [couponCode, setCouponCode] = useState<string>('');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
    const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

    const dispatch = useDispatch();

    const incrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity >= cartItem.stock)
            return toast.error(`We have only ${cartItem.stock} in Stock!`);
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity <= 1) return;
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const removeHandler = (productId: string) => {
        dispatch(removeCartItem(productId));
    };

    useEffect(() => {
        if (!couponCode) return;

        // Using a cancel token to prevent overlapping requests.
        // This ensures that if a new request is triggered while a previous one is still pending,
        // the previous request will be canceled to avoid race conditions and unnecessary network calls.
        const { token: cancelToken, cancel } = axios.CancelToken.source();

        const timeOutId = setTimeout(() => {
            axios
                .post(
                    `${server}/api/v1/payment/discount`,
                    { couponCode },
                    { cancelToken }
                )
                .then((res) => {
                    const discount = res.data.discount;

                    dispatch(discountApplied(discount));
                    setIsValidCouponCode(true);
                    setIsCouponApplied(true);
                    dispatch(calculatePrice());

                    toast.success('Coupon applied successfully!');
                })
                .catch((e) => {
                    console.log(
                        e?.response?.data?.message || 'Error applying coupon'
                    );
                    dispatch(discountApplied(0));
                    setIsValidCouponCode(false);
                    dispatch(calculatePrice());
                });
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
            cancel('Request Cancel due to new request');
            setIsValidCouponCode(false);
        };
    }, [couponCode, dispatch]);

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems, dispatch]);

    // Keep your existing imports and component logic the same as before
    // Only update the return statement with this JSX:

    return (
        <div className='cart-container'>
            <div className='cart-header'>
                <h1>Your Shopping Cart</h1>
                {cartItems.length > 0 && (
                    <p>
                        {cartItems.length}{' '}
                        {cartItems.length === 1 ? 'item' : 'items'}
                    </p>
                )}
            </div>

            <div className='cart-content'>
                <main className='cart-items'>
                    {cartItems.length > 0 ? (
                        cartItems.map((i, idx) => (
                            <CartItemCard
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                removeHandler={removeHandler}
                                key={idx}
                                cartItem={i}
                            />
                        ))
                    ) : (
                        <div className='empty-cart'>
                            <h2>Your cart is empty</h2>
                            <p>
                                Looks like you haven't added anything to your
                                cart yet
                            </p>
                            <Link
                                to='/'
                                className='continue-shopping'
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </main>

                {cartItems.length > 0 && (
                    <aside className='cart-summary'>
                        <h3>Order Summary</h3>

                        <div className='price-breakdown'>
                            <div className='summary-row'>
                                <span>Subtotal</span>
                                <span>₹{subTotal.toFixed(2)}</span>
                            </div>

                            <div className='summary-row'>
                                <span>Shipping</span>
                                <span>₹{shippingCharges.toFixed(2)}</span>
                            </div>

                            <div className='summary-row'>
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>

                            {isCouponApplied && isValidCouponCode && (
                                <div className='summary-row discount'>
                                    <span>Discount ({couponCode})</span>
                                    <span>- ₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className='coupon-section'>
                            <div className='coupon-input'>
                                <input
                                    type='text'
                                    placeholder='Enter coupon code'
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(
                                            e.target.value
                                                .toUpperCase()
                                                .replace(/\s/g, '')
                                        )
                                    }
                                />
                                {/* <button
                                    onClick={applyCouponHandler}
                                    disabled={!couponCode.trim()}
                                >
                                    Apply
                                </button> */}
                            </div>

                            {couponCode && !isValidCouponCode && (
                                <div className='coupon-error'>
                                    <VscError />
                                    <span>Invalid coupon code</span>
                                </div>
                            )}
                        </div>

                        <div className='summary-row total'>
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <Link
                            to='/shipping'
                            className='checkout-button'
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to='/'
                            className='continue-shopping'
                        >
                            Continue Shopping
                        </Link>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default Cart;
