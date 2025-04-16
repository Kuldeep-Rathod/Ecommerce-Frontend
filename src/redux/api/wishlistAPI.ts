import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    MessageResponse,
    ToggleWishlistRequest,
    WishlistResponse,
} from '../../types/api-types';

export const wishlistAPI = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/wishlist`,
    }),
    tagTypes: ['wishlists'],
    endpoints: (builder) => ({
        getWishlist: builder.query<WishlistResponse, string>({
            query: (id) => `/my?userId=${id}`,
            providesTags: ['wishlists'],
        }),
        toggleWishlist: builder.mutation<
            MessageResponse,
            ToggleWishlistRequest
        >({
            query: ({ productId, userId }) => ({
                url: `toggle`,
                method: 'POST',
                body: { productId, userId },
            }),
            invalidatesTags: ['wishlists'],
        }),
    }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistAPI;
