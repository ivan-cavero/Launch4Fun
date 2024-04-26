import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    preferences: {
      language: null
    }
  },
  reducers: {
    updateLanguage(state, action) {
      state.preferences.language = action.payload
    }
  }
})

export const { login, logout, updateLanguage } = userSlice.actions
export default userSlice.reducer
