import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeStatus } from './statusSlice';
import { axiosCompanyForm } from '@/utils/axiosCompanyForm';

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
    const token = localStorage.getItem('token');
    const response = await axiosCompanyForm.put('/me/', formData, { headers: { Authorization: `${token}` } });
    const data = response.data as { message: string };
    console.log(data.message)
    dispatch(changeStatus(true));
    return data;
  }
);

export const comapnyDeleteProfile = createAsyncThunk(
  'profile/companyDeleteProfile',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    const response = await axiosCompanyForm.delete('/me/', { headers: { Authorization: `${token}` } });
    const data = response.data as { message: string };
    console.log(data.message);
    dispatch(changeStatus(true));
    return data;
  }
);

const companyProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companySubmitProfile.fulfilled, (state, action) => {
      console.log('Submit Profile successful:', action.payload);
    });
    builder.addCase(companySubmitProfile.rejected, (state, action) => {
      console.log('Submit Profile failed:', action.error);
    });
    builder.addCase(comapnyDeleteProfile.fulfilled, (state, action) => {
      console.log('Delete Profile successful:', action.payload);
    });
    builder.addCase(comapnyDeleteProfile.rejected, (state, action) => {
      console.log('Delete Profile failed:', action.error);
    });
  },
});

export default companyProfileSlice.reducer;
