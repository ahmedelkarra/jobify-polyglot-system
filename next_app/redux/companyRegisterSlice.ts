import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeStatus } from './statusSlice';
import { axiosCompanyForm } from '@/utils/axiosCompanyForm';
import { clearMessages, handelError, handelSuccess } from './messageSlice';

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
    try {
      const response = await axiosCompanyForm.post('/register/', formData);
      const data = response.data as { token: string };
      localStorage.setItem('company_token', `token ${data?.token}`);
      dispatch(handelSuccess('Register successfully'))
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

const companyRegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companySubmitRegister.fulfilled, (state, action) => {
    });
  },
});

export default companyRegisterSlice.reducer;
