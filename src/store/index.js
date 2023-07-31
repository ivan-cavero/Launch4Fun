import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import configurationReducer from './configuration';
import favoritesReducer from './favorites';

const persistFavoritesConfig = {
  key: 'favorites',
  storage: AsyncStorage,
};

const persistConfigurationConfig = {
  key: 'configuration',
  storage: AsyncStorage,
};

const persistedFavoritesReducer = persistReducer(persistFavoritesConfig, favoritesReducer);
const persistedConfigurationReducer = persistReducer(persistConfigurationConfig, configurationReducer);

const store = configureStore({
  reducer: {
    configuration: persistedConfigurationReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;

