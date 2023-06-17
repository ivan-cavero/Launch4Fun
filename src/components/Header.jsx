// src/components/Header.js
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import MenuIcon from './Icons/MenuIcon'

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
        <MenuIcon
          size={24}
        />
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
