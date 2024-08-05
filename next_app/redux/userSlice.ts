import { axiosForm } from '@/utils/axiosForm';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface IUserSlice {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const initialState: IUserSlice = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  isAdmin: false
};

export const fetchUserInfo = createAsyncThunk<IUserSlice, void>(
  'me/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('user_token');
    try {
      const response = await axiosForm.get('/me/', { headers: { Authorization: `${token}` } });
      return response.data as IUserSlice;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.first_name = ''
        state.last_name = ''
        state.username = ''
        state.email = ''
        state.isAdmin = false
        console.error('Failed to fetch user info:', action.payload);
      });
  },
});

export default userSlice.reducer;
