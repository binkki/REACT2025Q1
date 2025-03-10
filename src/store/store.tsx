import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { rickApi } from './api/rickApi';
import { useDispatch } from 'react-redux';

export const setupStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      [rickApi.reducerPath]: rickApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;

export const store = setupStore();
