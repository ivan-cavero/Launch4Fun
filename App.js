import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'

import Header from './src/components/Header';
import LaunchList from './src/components/LaunchList';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <LaunchList />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
