import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeStatus } from './statusSlice';
import { axiosCompanyForm } from '@/utils/axiosCompanyForm';
import { handelSuccess, handelError, clearMessages } from './messageSlice';

export interface CompanyLoginState {
  username: string;
  password: string;
}

const initialState: CompanyLoginState = {
  username: "",
  password: "",
}

export const submitLoginCompany = createAsyncThunk(
  'login/submitLogin',
  async (credentials: { username: string, password: string }, { dispatch }) => {
    try {
      const response = await axiosCompanyForm.post('/login/', credentials);
      const data = response.data as { token: string, message: string };
      localStorage.setItem('company_token', `${data?.token}`);
      dispatch(handelSuccess('Login successfully'))
      setTimeout(() => {
        dispatch(clearMessages())
        dispatch(changeStatus(true));
      }, 2000)
      return data;
    } catch (error: any) {
      setTimeout(() => {
        dispatch(clearMessages())
      }, 2000)
      return dispatch(handelError(error.response?.data?.message || 'An error occurred'))
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
      })
  },
});

export default companyLoginSlice.reducer;
