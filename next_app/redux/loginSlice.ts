import { axiosForm } from '@/utils/axiosForm';
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  username: string;
  password: string;
}

const initialState: CounterState = {
  username: "",
  password: "",
}

export const counterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    submitLogin: (state, payload) => {
      state = payload.payload
      console.log(state)
      axiosForm.post('/login/', state)
        .then((e) => {
          console.log(e.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})


export const { submitLogin } = counterSlice.actions

export default counterSlice.reducer