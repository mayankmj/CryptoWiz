import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoCoinApi } from '../services/cryptoCoinApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { coinDetailApi } from '../services/coinDetailsApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoCoinApi.reducerPath]: cryptoCoinApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coinDetailApi.reducerPath]: coinDetailApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoCoinApi.middleware,cryptoNewsApi.middleware,coinDetailApi.middleware),
});
