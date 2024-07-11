import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    preferences: {
      language: null,
      theme: 'auto' // 'auto', 'light', 'dark'
    }
  },
  reducers: {
    updateLanguage(state, action) {
      state.preferences.language = action.payload
    },
    updateTheme(state, action) {
      state.preferences.theme = action.payload
    }
  }
})

export const { login, logout, updateLanguage, updateTheme } = userSlice.actions
export default userSlice.reducer
