// src/utils/checkInternetConnection.js
import NetInfo from '@react-native-community/netinfo';

export const subscribeToConnectionChanges = async (callback) => {
  const netInfo = await NetInfo.fetch();
  callback(netInfo.isConnected && netInfo.isInternetReachable);

  const unsubscribe = NetInfo.addEventListener((state) => {
    callback(state.isConnected && state.isInternetReachable);
  });

  return unsubscribe;
};
