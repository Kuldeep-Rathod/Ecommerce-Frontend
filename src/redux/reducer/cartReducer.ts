import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartReducerInitialState } from '../../types/reducer-types';
import { CartItem, ShippingInfo } from '../../types/types';

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
    },
};

export const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex(
                (i) => i.productId === action.payload.productId
            );
            if (index !== -1) {
                state.cartItems[index] = action.payload;
            } else {
                state.cartItems.push(action.payload);
            }
            state.loading = false;
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(
                (i: CartItem) => i.productId !== action.payload
                //return that array where the payload id's item is not present!
            );
            state.loading = false;
        },
        calculatePrice: (state) => {
            const subTotal = state.cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            state.subTotal = subTotal;
            state.shippingCharges = subTotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subTotal * 0.18);
            state.total =
                state.subTotal +
                state.tax +
                state.shippingCharges -
                state.discount;
        },
        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
    },
});

export const {
    addToCart,
    removeCartItem,
    calculatePrice,
    discountApplied,
    saveShippingInfo,
    resetCart,
} = cartReducer.actions;
