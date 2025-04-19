// Checkout.tsx
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useNewOrderMutation } from '../redux/api/orderAPI';
import { resetCart } from '../redux/reducer/cartReducer';
import { responseToast } from '../utils/features';
import { NewOrderRequest } from '../types/api-types';
import { FiArrowLeft, FiCheck, FiLock } from 'react-icons/fi';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const {
        shippingInfo,
        cartItems,
        discount,
        shippingCharges,
        subTotal,
        tax,
        total,
    } = useSelector((state: RootState) => state.cartReducer);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [newOrder] = useNewOrderMutation();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true);

        const orderData: NewOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subTotal,
            discount,
            shippingCharges,
            tax,
            total,
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            user: user?._id!,
        };

        if (cartItems.length === 0) {
            toast.error('Your cart is empty.');
            return;
        }

        if (
            !shippingInfo.address ||
            !shippingInfo.city ||
            !shippingInfo.country ||
            !shippingInfo.pinCode
        ) {
            toast.error('Shipping information is incomplete.');
            return;
        }

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin },
            redirect: 'if_required',
        });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || 'Something Went Wrong');
        }

        if (paymentIntent.status === 'succeeded') {
            const res = await newOrder(orderData);
            dispatch(resetCart());
            Swal.fire({
                title: 'Payment Successful!',
                text: 'Thank you for your purchase.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });

            responseToast(res, navigate, '/orders');
        }
        setIsProcessing(false);
    };

    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <h1>Complete Your Purchase</h1>
                <p>Please enter your payment details to place your order</p>

                <div className='progress-steps'>
                    <div className='step'>
                        <div className='step-number completed'>
                            <FiCheck />
                        </div>
                        <div className='step-label completed'>Shipping</div>
                    </div>
                    <div className='step'>
                        <div className='step-number active'>2</div>
                        <div className='step-label active'>Payment</div>
                    </div>
                    <div className='step'>
                        <div className='step-number'>3</div>
                        <div className='step-label'>Confirmation</div>
                    </div>
                </div>
            </div>

            <div className='checkout-container'>
                <div className='payment-section'>
                    <h2>Payment Method</h2>
                    <form onSubmit={submitHandler}>
                        <PaymentElement />
                        <button
                            type='submit'
                            disabled={!stripe || isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <span className='spinner'></span>
                                    Processing...
                                </>
                            ) : (
                                `Pay ₹${total.toFixed(2)}`
                            )}
                        </button>
                    </form>
                    <Link
                        to={'/cart'}
                        className='back-to-cart'
                    >
                        <FiArrowLeft /> Back to Cart
                    </Link>
                </div>

                <div className='order-summary'>
                    <h2>Order Summary</h2>
                    <div className='order-items'>
                        {cartItems.map((item) => (
                            <div
                                className='item'
                                key={item.productId}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className='item-details'>
                                    <div className='item-name'>{item.name}</div>
                                    <div className='item-price'>
                                        ₹{item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className='item-quantity'>
                                    x{item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='price-breakdown'>
                        <div className='price-row'>
                            <span>Subtotal:</span>
                            <span>₹{subTotal.toFixed(2)}</span>
                        </div>
                        <div className='price-row'>
                            <span>Shipping:</span>
                            <span>₹{shippingCharges.toFixed(2)}</span>
                        </div>
                        <div className='price-row'>
                            <span>Discount:</span>
                            <span>-₹{discount.toFixed(2)}</span>
                        </div>
                        <div className='price-row'>
                            <span>Tax:</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className='price-row total'>
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className='secure-payment'>
                        <FiLock />
                        <span>Secure payment processed by Stripe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const clientSecret: string | undefined = location.state;

    if (!clientSecret) return <Navigate to={'/shipping'} />;

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
            }}
        >
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
