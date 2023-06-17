import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import MenuIcon from './Icons/MenuIcon';
import WarningIcon from './Icons/WarningIcon';
import UpdateIcon from './Icons/UpdateIcon';

import { subscribeToConnectionChanges } from '../utils/checkInternetConnection';
import { checkForNewVersion } from '../utils/versionChecker';

const Header = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

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

  useEffect(() => {
    const checkVersion = async () => {
      const isNewVersion = await checkForNewVersion();
      setNewVersionAvailable(isNewVersion);
    };

    checkVersion();
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
        {newVersionAvailable && (
          <TouchableOpacity style={styles.updateIcon}>
            <UpdateIcon size={24} fill={'#fcf403'} />
          </TouchableOpacity>
        )}
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
    marginRight: 10,
  },
  updateIcon: {
    marginRight: 10,
  },
});

export default Header;