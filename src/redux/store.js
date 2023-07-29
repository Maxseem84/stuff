import { configureStore } from '@reduxjs/toolkit';
import categories from './../redux/categories/slice';
import products from './../redux/products/slice';
import user from './../redux/user/slice';
import { apiSlice } from './../redux/api/apiSlice';

export const store = configureStore({
  reducer: {
    categories,
    products,
    user,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
