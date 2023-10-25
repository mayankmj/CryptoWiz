import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
      'X-RapidAPI-Key': '15b782e848mshe6e0bb01c68814cp1ec363jsn3ba3b27ad9ca',
    'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
}
const baseUrl = 'https://crypto-update-live.p.rapidapi.com/top-currency'

const createRequest = (url) =>({url,headers: cryptoApiHeaders})
export const cryptoCoinApi = createApi({
    reducerPath: 'cryptoCoinApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCoins: builder.query({ 
           query: (count) => createRequest(`/top_50_details?limit=${count}`),

        }),
    })
})
export const {
    useGetCoinsQuery,
} = cryptoCoinApi;