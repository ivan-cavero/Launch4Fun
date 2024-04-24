import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import selectedLaunchReducer from './selectedLaunch'

const store = configureStore({
  reducer: {
    selectedLaunch: selectedLaunchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export default store
