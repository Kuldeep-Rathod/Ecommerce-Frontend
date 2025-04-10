import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllProductResponse } from '../../types/api-types';

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
    }),
});

export const { useLatestProductsQuery, useAllProductsQuery } = productAPI;
