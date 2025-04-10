import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllProductResponse, CategoriesResponse } from '../../types/api-types';

export const productAPI = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductResponse, string>({
            query: () => 'latest',
        }),
        allProducts: builder.query<AllProductResponse, string>({
            query: (id) => `admin-product?id=${id}`,
        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => `categories`,
        }),
    }),
});

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
} = productAPI;
