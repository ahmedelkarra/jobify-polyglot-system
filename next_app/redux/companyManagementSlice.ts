import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosCompanyManagement} from '@/utils/axiosCompanyManagement';
import { changeStatus } from './statusSlice';
import { clearMessages, handelError, handelSuccess } from './messageSlice';

export interface managementState {
  title: string;
  body: string;
}

const initialState: managementState = {
  title: "",
  body: "",
}

export const management = createAsyncThunk(
  '/management',
  async (credentials: { title: string, body: string }, { dispatch }) => {
    try {
      const response = await axiosCompanyManagement.post('/company-management/', credentials);
      const data = response.data as { token: string };
      localStorage.setItem('user_token', `token ${data?.token}`);
      dispatch(handelSuccess('Job has been added'))
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

const managementSlice = createSlice({
  name: 'company-management',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(management.fulfilled, (state, action) => {
      state.title = action.meta.arg.title;
      state.body = action.meta.arg.body;
    });
  },
});

export default managementSlice.reducer;
