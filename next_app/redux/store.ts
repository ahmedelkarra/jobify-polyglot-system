import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import counterReducer from './counterSlice';
import registerSlice from './registerSlice';
import loginSlice from './loginSlice';
import userSlice from './userSlice';
import statusSlice from './statusSlice';
import companyRegisterSlice from './companyRegisterSlice';
import companySlice from './companySlice';
import companyLoginSlice from './companyLoginSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: registerSlice,
    login:loginSlice,
    me:userSlice,
    status:statusSlice,
    companyRegister: companyRegisterSlice,
    companyLogin:companyLoginSlice,
    company:companySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
