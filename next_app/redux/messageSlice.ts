import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface messageState {
  successMessage: string;
  errorMessage: string;
}

const initialState: messageState = {
  successMessage: "",
  errorMessage: "",
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    handelSuccess: (state, action) => {
      console.log(`From messageSlice ${action.payload}`);
      state.errorMessage = ''
      state.successMessage = action.payload
    },
    handelError: (state, action) => {
      state.successMessage = ''
      state.errorMessage = action.payload
    },
    clearMessages: (state) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
});

export const { handelSuccess, handelError, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
