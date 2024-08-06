import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeStatus } from './statusSlice';
import { axiosCompanyForm } from '@/utils/axiosCompanyForm';

export interface CompanyLoginState {
  username: string;
  password: string;
  successMessage: string;
  errorMessage: string;
}

const initialState: CompanyLoginState = {
  username: "",
  password: "",
  successMessage: "",
  errorMessage: "",
}

export const submitLoginCompany = createAsyncThunk(
  'login/submitLogin',
  async (credentials: { username: string, password: string }, { dispatch }) => {
    try {
      const response = await axiosCompanyForm.post('/login/', credentials);
      const data = response.data as { token: string };
      localStorage.setItem('company_token', `${data?.token}`);
      dispatch(changeStatus(true));
      return data;
    } catch (error: any) {
      return Promise.reject(error.response?.data?.message || 'An error occurred');
    }
  }
);

const companyLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitLoginCompany.fulfilled, (state, action) => {
        state.username = action.meta.arg.username;
        state.password = action.meta.arg.password;
        state.successMessage = 'Login successful!';
        state.errorMessage = '';
        console.log(state.successMessage)
      })
      .addCase(submitLoginCompany.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Login failed';
        state.successMessage = '';
        console.log(state.errorMessage)
      });
  },
});

export default companyLoginSlice.reducer;
