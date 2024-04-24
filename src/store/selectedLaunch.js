import { createSlice } from '@reduxjs/toolkit'

const selectedLaunchSlice = createSlice({
  name: 'selectedLaunch',
  initialState: {
    selectedLaunch: null
  },
  reducers: {
    setSelectedLaunch: (state, action) => {
      state.selectedLaunch = action.payload
    }
  }
})

export const { setSelectedLaunch } = selectedLaunchSlice.actions
export default selectedLaunchSlice.reducer
