import { axiosForm } from '@/utils/axiosForm';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ICompanySlice {
  owner_first_name: string;
  owner_last_name: string;
  email: string;
  username: string;
  company_name: string;
  website: string;
}

const initialState: ICompanySlice = {
  owner_first_name: "",
  owner_last_name: "",
  email: "",
  username: "",
  company_name: '',
  website: '',
};

export const fetchUserInfo = createAsyncThunk<ICompanySlice, void>(
  'me/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('company_token');
    try {
      const response = await axiosForm.get('/me/', { headers: { Authorization: `${token}` } });
      return response.data as ICompanySlice;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const companySlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.owner_first_name = "",
          state.owner_last_name = "",
          state.email = "",
          state.username = "",
          state.company_name = '',
          state.website = '',
          console.error('Failed to fetch user info:', action.payload);
      });
  },
});

export default companySlice.reducer;
