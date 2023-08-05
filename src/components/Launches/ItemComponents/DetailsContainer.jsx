import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import DateStatusContainer from './DateStatusContainer';

const DetailsContainer = ({ name, location, launchDate, status, statusDescription, timeRemaining }) => {
  const scheme = useColorScheme();

  const checkTheme = useSelector((state) => state.configuration?.theme);
  const theme = checkTheme ?? scheme;

  const styles = StyleSheet.create({
    detailsContainer: {
      flex: 1,
      justifyContent: 'space-around',
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: theme === 'dark' ? '#202020' : 'rgba(255, 255, 255, 0.8)',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    location: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#9E9E9E' : '#7E7E7E',
    },
    timer: {
      fontSize: 12,
      color: theme === 'dark' ? '#9E9E9E' : '#7E7E7E',
    },
  });

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
        <DateStatusContainer
        launchDate={launchDate}
        status={status}
        statusDescription={statusDescription}
      />
      <Text style={styles.timer}>{timeRemaining}</Text>
    </View>
  );
};

export default DetailsContainer;
