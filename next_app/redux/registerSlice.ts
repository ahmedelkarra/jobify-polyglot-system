import { axiosForm } from '@/utils/axiosForm';
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialState: CounterState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
}

export const counterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    submitRegister: (state, payload) => {
      state = payload.payload
      console.log(state)
      axiosForm.post('/register', state)
        .then((e) => {
          console.log(e.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})


export const { submitRegister } = counterSlice.actions

export default counterSlice.reducer