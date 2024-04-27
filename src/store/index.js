import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import selectedLaunchReducer from './selectedLaunch'
import userReducer from './user'

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage
}

const persistedUserReducer = persistReducer(persistUserConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    selectedLaunch: selectedLaunchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export default store
