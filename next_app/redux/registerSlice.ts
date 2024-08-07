import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForm } from '@/utils/axiosForm';
import { changeStatus } from './statusSlice';
import { clearMessages, handelError, handelSuccess } from './messageSlice';

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
    try {
      const response = await axiosForm.post('/register/', formData);
      const data = response.data as { token: string };
      localStorage.setItem('user_token', `token ${data?.token}`);
      dispatch(handelSuccess('User has been created'))
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

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitRegister.fulfilled, (state, action) => {
    });
  },
});

export default registerSlice.reducer;
