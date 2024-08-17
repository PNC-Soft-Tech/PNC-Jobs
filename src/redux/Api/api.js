import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import 'vite/client'
const ENV = process.env.ENV;
const API_PROD_URL = process.env.API_PROD_URL;
const API_DEV_URL = process.env.API_DEV_URL;
const API_STAGING_URL = process.env.API_STAGING_URL;

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'users',
  ],
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    baseUrl:
      ENV === 'PROD'
        ? API_PROD_URL
        : ENV === 'STAGING'
        ? API_STAGING_URL
        : API_DEV_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from your auth state
      const token = getState()?.user?.user?.token;
      // console.log('api~~', getState().user, token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
