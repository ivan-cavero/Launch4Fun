import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DateStatusContainer from './DateStatusContainer';

const DetailsContainer = ({ name, location, launchDate, status, statusBackgroundColor, timeRemaining }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.location}>{location}</Text>
    <DateStatusContainer
      launchDate={launchDate}
      status={status}
      statusBackgroundColor={statusBackgroundColor}
    />
    <Text style={styles.timer}>{timeRemaining}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7E7E7E',
  },
  timer: {
    fontSize: 12,
    color: '#7E7E7E',
  },
});

export default DetailsContainer;
