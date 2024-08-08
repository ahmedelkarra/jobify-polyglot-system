import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeStatus } from './statusSlice';
import { axiosCompanyForm } from '@/utils/axiosCompanyForm';
import { clearMessages, handelError, handelSuccess } from './messageSlice';

export interface companyProfileState {
  owner_first_name: string;
  owner_last_name: string;
  email: string;
  username: string;
  company_name: string;
  website: string;
  password: string;
  new_password: string;
  confirm_new_password: string;
}

const initialState: companyProfileState = {
  owner_first_name: "",
  owner_last_name: "",
  email: "",
  username: "",
  company_name: "",
  website: "",
  password: "",
  new_password: "",
  confirm_new_password: ""
}

export const companySubmitProfile = createAsyncThunk(
  'profile/companySubmitProfile',
  async (formData: companyProfileState, { dispatch }) => {
    try {
      const token = localStorage.getItem('company_token');
      const response = await axiosCompanyForm.put('/me/', formData, { headers: { Authorization: `${token}` } });
      const data = response.data as { message: string };
      dispatch(handelSuccess('Profile has been changed'))
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

export const comapnyDeleteProfile = createAsyncThunk(
  'profile/companyDeleteProfile',
  async (formData: companyProfileState, { dispatch }) => {
    try {
      const token = localStorage.getItem('company_token');
      const headers = { Authorization: `${token}` };
      const response = await axiosCompanyForm.delete('/me/', {
        headers,
        data: formData
      });
      const responseData = response.data as { message: string };
      dispatch(handelSuccess('Profile has been deleted'))
      setTimeout(() => {
        dispatch(clearMessages())
        dispatch(changeStatus(true));
      }, 2000)
      return responseData;
    } catch (error: any) {
      setTimeout(() => {
        dispatch(clearMessages())
      }, 2000)
      return dispatch(handelError(error.response?.data?.message))
    }
  }
);

const companyProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companySubmitProfile.fulfilled, (state, action) => {
    });
    builder.addCase(comapnyDeleteProfile.fulfilled, (state, action) => {
    });
  },
});

export default companyProfileSlice.reducer;
