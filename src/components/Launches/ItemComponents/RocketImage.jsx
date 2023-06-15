import React from 'react';
import { Image, StyleSheet } from 'react-native';

const RocketImage = ({ uri }) => (
  <Image
    style={styles.rocketImage}
    source={{ uri }}
    resizeMode="cover"
  />
);

const styles = StyleSheet.create({
  rocketImage: {
    width: '30%',
    height: '100%'
  },
});

export default RocketImage;
