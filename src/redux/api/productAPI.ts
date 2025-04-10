import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AllProductResponse,
    CategoriesResponse,
    SearchProductRequest,
    SearchProductResponse,
} from '../../types/api-types';

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

        searchProducts: builder.query<
            SearchProductResponse,
            SearchProductRequest
        >({
            query: ({ price, category, page, search, sort }) => {
                let base = `all?search=${search}&page=${page}`;

                if (price) base += `&price=${price}`;
                if (category) base += `&category=${category}`;
                if (sort) base += `&sort=${sort}`;

                return base;
            },
        }),
    }),
});

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
} = productAPI;
