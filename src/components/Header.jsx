// src/components/Header.js
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Header = () => {
  return (
    <LinearGradient
      colors={['#60A3D9', '#0074B7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>Go4Launch</Text>
      <TouchableOpacity style={styles.menuIcon}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M3 6h18c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1s.4 1 1 1zm18 5H3c-.6 0-1 .4-1 1s.4 1 1 1h18c.6 0 1-.4 1-1s-.4-1-1-1zm0 7H3c-.6 0-1 .4-1 1s.4 1 1 1h18c.6 0 1-.4 1-1s-.4-1-1-1z"
            fill="#FFFFFF"
          />
        </Svg>
      </TouchableOpacity>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
  },
  menuIcon: {
    padding: 5,
  },
});


export default Header;
