import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dotacoach-server.onrender.com/api',
  }),
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: (steamId) => `analytics/${steamId}`,
    }),
  }),
});

export const { useGetAnalyticsQuery } = api;
