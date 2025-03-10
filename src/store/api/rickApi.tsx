import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../utils/constants';
import { CardInfo, ApiResponse } from '../../types';

export const rickApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (build) => ({
    getCards: build.query<ApiResponse, { searchTerm: string; page: number }>({
      query: ({ searchTerm, page }) => `?page=${page}&name=${searchTerm}`,
    }),
    getDetails: build.query<CardInfo, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});
