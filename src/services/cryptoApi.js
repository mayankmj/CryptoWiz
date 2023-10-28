import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'


// 1
const cryptoApiHeaders = {
       'X-RapidAPI-Key': '15b782e848mshe6e0bb01c68814cp1ec363jsn3ba3b27ad9ca',
    'X-RapidAPI-Host': 'coinpaprika1.p.rapidapi.com'
}
const baseUrl = 'https://coinpaprika1.p.rapidapi.com'

const createRequest = (url) =>({url,headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({ 
            query: () => createRequest('/global'),
        }),
        //  getCryptoDetails: builder.query({ 
        //     query: (coinId) => createRequest('/'),
        // }),
    })
    
})
export const {
    useGetCryptosQuery,
} = cryptoApi;

