import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForm } from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';

export interface companyProfileState {
  owner_first_name: "",
  owner_last_name: "",
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
  company_name: '',
  website: '',
  password: "",
  new_password: "",
  confirm_new_password: ""
}

export const submitProfile = createAsyncThunk(
  'profile/submitProfile',
  async (formData: companyProfileState, { dispatch }) => {
    const token = localStorage.getItem('token');
    const response = await axiosForm.put('/me/', formData, { headers: { Authorization: `${token}` } });
    const data = response.data as { message: string };
    console.log(data.message)
    dispatch(changeStatus(true));
    return data;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/submitProfile',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    const response = await axiosForm.delete('/me/', { headers: { Authorization: `${token}` } });
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
    builder.addCase(submitProfile.fulfilled, (state, action) => {
      console.log('Submit Profile successful:', action.payload);
    });
    builder.addCase(submitProfile.rejected, (state, action) => {
      console.log('Submit Profile failed:', action.error);
    });
    builder.addCase(deleteProfile.fulfilled, (state, action) => {
      console.log('Delete Profile successful:', action.payload);
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      console.log('Delete Profile failed:', action.error);
    });
  },
});

export default companyProfileSlice.reducer;
