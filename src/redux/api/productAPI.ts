import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AllProductResponse,
    CategoriesResponse,
    DeleteProductRequest,
    MessageResponse,
    NewProductRequest,
    productResponse,
    SearchProductRequest,
    SearchProductResponse,
    UpdateProductRequest,
} from '../../types/api-types';

export const productAPI = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductResponse, string>({
            query: () => 'latest',
            providesTags: ['product'],
        }),
        allProducts: builder.query<AllProductResponse, string>({
            query: (id) => `admin-product?id=${id}`,
            providesTags: ['product'],
        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => `categories`,
            providesTags: ['product'],
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
            providesTags: ['product'],
        }),

        productDetails: builder.query<productResponse, string>({
            query: (id) => id,
            providesTags: ['product'],
        }),

        newProduct: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({ formData, id }) => ({
                url: `new?id=${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['product'],
        }),

        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({ formData, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['product'],
        }),

        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        }),
    }),
});

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productAPI;
