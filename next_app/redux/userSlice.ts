import { axiosForm } from '@/utils/axiosForm';
import { createSlice } from '@reduxjs/toolkit'

export interface IUserSlice {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

const initialState: IUserSlice = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
}

export const userSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    userInfo: (state) => {
      console.log(state)
      axiosForm.post('/me/', state)
        .then((e) => {
          console.log(e.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})


export const { userInfo } = userSlice.actions

export default userSlice.reducer