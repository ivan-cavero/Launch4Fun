import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import Header from './src/components/Header';
import UpcomingLaunchList from './src/components/Launches/UpcomingLaunchList';
import PastLaunchList from './src/components/Launches/PastLaunchList';
import RocketIcon from './src/components/Icons/RocketIcon';
import HistoryIcon from './src/components/Icons/HistoryIcon';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  const renderButton = (title, IconComponent, focused) => (
    <View style={styles.button}>
      <IconComponent size={24} color={focused ? '#0074B7' : 'gray'} />
      <Text style={focused ? styles.selectedButtonText : styles.buttonText}>
        {title}
      </Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      {selectedIndex === 0 ? <UpcomingLaunchList /> : <PastLaunchList />}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => updateIndex(0)}>
          {renderButton('Upcoming', RocketIcon, selectedIndex === 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateIndex(1)}>
          {renderButton('Past', HistoryIcon, selectedIndex === 1)}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    height: 50,
    paddingBottom: 2,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'gray',
  },
  selectedButtonText: {
    fontSize: 12,
    color: '#0074B7',
  },
});

export default App;
