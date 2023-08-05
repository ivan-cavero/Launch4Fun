import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

const RocketImage = ({ uri, isFavorite }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.rocketImage}
        source={{ uri }}
        contentFit="cover"
        transition={1000}
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
