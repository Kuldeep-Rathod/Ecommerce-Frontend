import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    DecreaseQuantityRequest,
    GetCartResponse,
    MessageResponse,
    UpsertCartRequest,
} from '../../types/api-types';

export const cartAPI = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/cart`,
    }),
    tagTypes: ['cart'],
    endpoints: (builder) => ({
        // GET /my?userId=123
        getCart: builder.query<GetCartResponse, string>({
            query: (userId) => `/my?userId=${userId}`,
            providesTags: ['cart'],
        }),

        // PUT /upsert { userId, cartItems }
        upsertCart: builder.mutation<MessageResponse, UpsertCartRequest>({
            query: ({ userId, cartItems }) => ({
                url: `/upsert?userId=${userId}`,
                method: 'PUT',
                body: { cartItems },
            }),
            invalidatesTags: ['cart'],
        }),

        // POST /decrease { userId, cartItems }
        updateCartItemQuantity: builder.mutation<
            MessageResponse,
            DecreaseQuantityRequest
        >({
            query: ({ userId, productId, action }) => ({
                url: `/update?userId=${userId}&productId=${productId}&action=${action}`,
                method: 'POST',
            }),
            invalidatesTags: ['cart'],
        }),

        // DELETE /:productId?userId=123
        removeCartItem: builder.mutation<
            MessageResponse,
            { userId: string; productId: string }
        >({
            query: ({ userId, productId }) => ({
                url: `/${productId}?userId=${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart'],
        }),

        // DELETE /clear?userId=123
        clearCart: builder.mutation<MessageResponse, string>({
            query: (userId) => ({
                url: `/clear?userId=${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useUpsertCartMutation,
    useUpdateCartItemQuantityMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
} = cartAPI;
