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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useNewOrderMutation } from '../redux/api/orderAPI';
import { resetCart } from '../redux/reducer/cartReducer';
import { responseToast } from '../utils/features';
import { NewOrderRequest } from '../types/api-types';

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

            responseToast(res, navigate, '/orders');
        }
        setIsProcessing(false);
    };

    return (
        <div className='checkout-container'>
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button>{isProcessing ? 'Processing...' : 'Pay'}</button>
            </form>
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
            {' '}
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
