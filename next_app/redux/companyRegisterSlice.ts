import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForm } from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';

export interface companyRegisterState {
  owner_first_name: string;
  owner_last_name: string;
  email: string;
  username: string;
  company_name: string;
  website: string;
  password: string;
  confirm_password: string;
}

const initialState: companyRegisterState = {
  owner_first_name: "",
  owner_last_name: "",
  email: "",
  username: "",
  company_name: '',
  website: '',
  password: "",
  confirm_password: ""
};

export const companySubmitRegister = createAsyncThunk(
  'register/submitRegister',
  async (formData: companyRegisterState, { dispatch }) => {
    const response = await axiosForm.post('/register/', formData);
    const data = response.data as { token: string };
    localStorage.setItem('token', `token ${data?.token}`);
    dispatch(changeStatus(true));
    return data;
  }
);

const companyRegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companySubmitRegister.fulfilled, (state, action) => {
      console.log('Registration successful:', action.payload);
    });
    builder.addCase(companySubmitRegister.rejected, (state, action) => {
      console.log('Registration failed:', action.error);
    });
  },
});

export default companyRegisterSlice.reducer;
