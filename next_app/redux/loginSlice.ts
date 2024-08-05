import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosForm} from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';

export interface CounterState {
  username: string;
  password: string;
}

const initialState: CounterState = {
  username: "",
  password: "",
}

export const submitLogin = createAsyncThunk(
  'login/submitLogin',
  async (credentials: { username: string, password: string }, { dispatch }) => {
    const response = await axiosForm.post('/login/', credentials);
    const data = response.data as { token: string };
    localStorage.setItem('user_token', `token ${data?.token}`);
    dispatch(changeStatus(true));
    return data;
  }
);

const counterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitLogin.fulfilled, (state, action) => {
      state.username = action.meta.arg.username;
      state.password = action.meta.arg.password;
    });
  },
});

export default counterSlice.reducer;
