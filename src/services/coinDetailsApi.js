import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '15b782e848mshe6e0bb01c68814cp1ec363jsn3ba3b27ad9ca',
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
};

const baseUrl = 'https://coingecko.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const coinDetailApi = createApi({
  reducerPath: 'coinDetailApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoinDetail: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    getExchanges: builder.query ({
      query: () => createRequest('/exchanges')
    }),
  }),
});

export const { useGetCoinDetailQuery , useGetExchangesQuery} = coinDetailApi;
