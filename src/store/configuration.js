import { createSlice } from '@reduxjs/toolkit';

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = configurationSlice.actions;

export default configurationSlice.reducer;
