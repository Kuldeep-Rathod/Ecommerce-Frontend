import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItem';
import {
    addToCart,
    calculatePrice,
    removeCartItem,
} from '../redux/reducer/cartReducer';
import { CartReducerInitialState } from '../types/reducer-types';
import { CartItem } from '../types/types';

const Cart = () => {
    const { cartItems, subTotal, tax, discount, total, shippingCharges } =
        useSelector(
            (state: { cartReducer: CartReducerInitialState }) =>
                state.cartReducer
        );

    const [couponCode, setCouponCode] = useState<string>('');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(true);

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
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) setIsValidCouponCode(true);
            else setIsValidCouponCode(false);
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
            setIsValidCouponCode(false);
        };
    }, [couponCode]);

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems, dispatch]);

    return (
        <div className='cart'>
            <main>
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
                    <h1>Your cart is empty</h1>
                )}
            </main>
            <aside>
                <p>Subtotal: ₹{subTotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: <em className='red'> - ₹{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>

                <input
                    type='text'
                    placeholder='Coupon Code'
                    value={couponCode}
                    onChange={(e) =>
                        setCouponCode(
                            e.target.value.toUpperCase().replace(/\s/g, '')
                        )
                    }
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className='green'>
                            ₹{discount} off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className='red'>
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to='/shipping'>Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;
