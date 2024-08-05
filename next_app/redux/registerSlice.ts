import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForm } from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';

export interface registerState {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialState: registerState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

export const submitRegister = createAsyncThunk(
  'register/submitRegister',
  async (formData: registerState, { dispatch }) => {
    const response = await axiosForm.post('/register/', formData);
    const data = response.data as { token: string };
    localStorage.setItem('user_token', `token ${data?.token}`);
    dispatch(changeStatus(true));
    return data;
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitRegister.fulfilled, (state, action) => {
      console.log('Registration successful:', action.payload);
    });
    builder.addCase(submitRegister.rejected, (state, action) => {
      console.log('Registration failed:', action.error);
    });
  },
});

export default registerSlice.reducer;
