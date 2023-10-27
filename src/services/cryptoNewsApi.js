import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
   'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '15b782e848mshe6e0bb01c68814cp1ec363jsn3ba3b27ad9ca',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) =>({url,headers: cryptoApiHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({ 
          query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    })
})
export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;