import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BarResponse, PieResponse, StatsResponse } from '../../types/api-types';

export const dashboardAPI = createApi({
    reducerPath: 'dashboardAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard`,
    }),
    endpoints: (builder) => ({
        stats: builder.query<StatsResponse, string>({
            query: (id) => `statistics?id=${id}`,
        }),
        pie: builder.query<PieResponse, string>({
            query: (id) => `pie?id=${id}`,
        }),
        bar: builder.query<BarResponse, string>({
            query: (id) => `bar?id=${id}`,
        }),
        line: builder.query<string, string>({
            query: (id) => `line?id=${id}`,
        }),
    }),
});

export const { useBarQuery, usePieQuery, useLineQuery, useStatsQuery } =
    dashboardAPI;
