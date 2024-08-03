import { createSlice } from '@reduxjs/toolkit'

export interface statusState {
  isChange: boolean;
}

const initialState: statusState = {
  isChange: false,
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    changeStatus: (state,actions) => {
      state.isChange = actions.payload
    },
  },
})


export const { changeStatus } = statusSlice.actions

export default statusSlice.reducer