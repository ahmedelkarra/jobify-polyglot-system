import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForm } from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';
import { clearMessages, handelError, handelSuccess } from './messageSlice';

export interface ProfileState {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  new_password: string;
  confirm_new_password: string;
}

const initialState: ProfileState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  new_password: "",
  confirm_new_password: ""
}

export const submitProfile = createAsyncThunk(
  'profile/submitProfile',
  async (formData: ProfileState, { dispatch }) => {
    try {
      const token = localStorage.getItem('user_token');
      const response = await axiosForm.put('/me/', formData, { headers: { Authorization: `${token}` } });
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

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('user_token');
      const response = await axiosForm.delete('/me/', { headers: { Authorization: `${token}` } });
      const data = response.data as { message: string };
      dispatch(handelSuccess('Profile has been deleted'))
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

const profileSlice = createSlice({
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

export default profileSlice.reducer;
