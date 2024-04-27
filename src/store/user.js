import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    preferences: {
      language: null,
      autoTranslate: false
    }
  },
  reducers: {
    updateLanguage(state, action) {
      state.preferences.language = action.payload
    },
    updateAutoTranslate(state, action) {
      state.preferences.autoTranslate = action.payload
    }
  }
})

export const { login, logout, updateLanguage, updateAutoTranslate } = userSlice.actions
export default userSlice.reducer
