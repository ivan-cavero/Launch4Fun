import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const RocketImage = ({ uri, isFavorite }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.rocketImage}
        source={{ uri }}
        resizeMode="cover"
      />
      {isFavorite && <Text style={styles.favorite}>★</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '30%',
    height: '100%'
  },
  rocketImage: {
    width: '100%',
    height: '100%'
  },
  favorite: {
    position: 'absolute',
    top: 3,
    right: 10,
    fontSize: 20,
    color: 'gold',
  }
});

export default RocketImage;
