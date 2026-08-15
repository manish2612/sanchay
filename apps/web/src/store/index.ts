import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

/**
 * The Redux store.
 *
 * RTK Query's middleware is required for cache invalidation, background
 * refetching, polling, and all other lifecycle management to work correctly.
 */
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
