import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { rickApi } from './api/rickApi';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [rickApi.reducerPath]: rickApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
