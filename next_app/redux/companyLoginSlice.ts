import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosForm} from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';

export interface companyLoginState {
  username: string;
  password: string;
}

const initialState: companyLoginState = {
  username: "",
  password: "",
}

export const submitLoginCompany = createAsyncThunk(
  'login/submitLogin',
  async (credentials: { username: string, password: string }, { dispatch }) => {
    const response = await axiosForm.post('/login/', credentials);
    const data = response.data as { token: string };
    localStorage.setItem('token', `token ${data?.token}`);
    dispatch(changeStatus(true));
    return data;
  }
);

const companyLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitLoginCompany.fulfilled, (state, action) => {
      state.username = action.meta.arg.username;
      state.password = action.meta.arg.password;
    });
  },
});

export default companyLoginSlice.reducer;
