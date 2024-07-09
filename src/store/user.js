import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    preferences: {
      language: null,
      autoTranslate: false,
      theme: 'auto' // 'auto', 'light', 'dark'
    }
  },
  reducers: {
    updateLanguage(state, action) {
      state.preferences.language = action.payload
    },
    updateAutoTranslate(state, action) {
      state.preferences.autoTranslate = action.payload
    },
    updateTheme(state, action) {
      state.preferences.theme = action.payload
    }
  }
})

export const { login, logout, updateLanguage, updateAutoTranslate, updateTheme } = userSlice.actions
export default userSlice.reducer
