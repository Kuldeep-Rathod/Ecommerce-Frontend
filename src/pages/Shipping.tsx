import { ChangeEvent, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartReducerInitialState } from '../types/reducer-types';

const Shipping = () => {
    const { cartItems } = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });

    const changeHandler = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (cartItems.length <= 0) return navigate('/cart');
    }, [cartItems]);

    return (
        <div className='shipping'>
            <button
                className='backBtn'
                onClick={() => navigate(-1)}
            >
                <BiArrowBack />
            </button>
            <form>
                <h1>Shipping Address</h1>
                <input
                    required
                    type='text'
                    placeholder='Address'
                    name='address'
                    value={shippingInfo.address}
                    onChange={changeHandler}
                />
                <input
                    required
                    type='text'
                    placeholder='City'
                    name='city'
                    value={shippingInfo.city}
                    onChange={changeHandler}
                />
                <input
                    required
                    type='text'
                    placeholder='State'
                    name='state'
                    value={shippingInfo.state}
                    onChange={changeHandler}
                />

                <select
                    required
                    name='country'
                    onChange={changeHandler}
                    value={shippingInfo.country}
                >
                    <option value=''>Select Contry</option>
                    <option value='india'>India</option>
                </select>

                <input
                    required
                    type='number'
                    placeholder='Pincode'
                    name='pincode'
                    value={shippingInfo.pincode}
                    onChange={changeHandler}
                />

                <button type='submit'>Pay Now</button>
            </form>
        </div>
    );
};

export default Shipping;
