// src/components/Header.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MenuIcon from './Icons/MenuIcon'
import WarningIcon from './Icons/WarningIcon'
import { subscribeToConnectionChanges } from '../utils/checkInternetConnection';
import { Tooltip } from 'react-native-elements';

const Header = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const unsubscribe = subscribeToConnectionChanges((connected) => {
        setIsConnected(connected);
      });

      return () => {
        unsubscribe();
      };
    };

    checkConnection();
  }, []);
  
  return (
    <LinearGradient
      colors={['#60A3D9', '#0074B7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>Go4Launch</Text>
      <View style={styles.iconsContainer}>
      {!isConnected && (
          <TouchableOpacity style={styles.warningIcon}>
            <Tooltip
              popover={<Text style={{ color: "#fff" }}>You are in offline mode. The data may not be up to date.</Text>}
              backgroundColor="rgb(61, 61, 61)"
              height={60}
              width={200}
              overlayColor="rgba(0, 0, 0, 0)"
            >
              <WarningIcon size={24} fill={'#f54242'} />
            </Tooltip>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.menuIcon}>
          <MenuIcon size={24} />
        </TouchableOpacity>
      </View>
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
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    marginRight: 10
  }
});


export default Header;
