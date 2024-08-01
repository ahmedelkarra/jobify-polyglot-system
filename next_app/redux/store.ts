import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import counterReducer from './counterSlice';
import registerSlice from './registerSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: registerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
