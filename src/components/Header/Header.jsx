import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTooltip from '../Reusable/CustomTooltip';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import MenuIcon from '../Icons/MenuIcon';
import WarningIcon from '../Icons/WarningIcon';
import UpdateIcon from '../Icons/UpdateIcon';

import { subscribeToConnectionChanges } from '../../utils/checkInternetConnection';
import { checkForNewVersion } from '../../utils/versionChecker';

const Header = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  const handleMenuIconClick = () => {
    navigation.openDrawer();
  };

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
    <SafeAreaView>
      <LinearGradient
        colors={['#60A3D9', '#0074B7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <TouchableOpacity style={styles.menuIcon} onPress={handleMenuIconClick}>
          <MenuIcon size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Launch4Fun</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.iconsRightContainer}>
            {newVersionAvailable && (
              <TouchableOpacity style={styles.updateIcon}>
                <UpdateIcon size={24} fill={'#fcf403'} />
              </TouchableOpacity>
            )}
            {!isConnected && (
              <TouchableOpacity style={styles.warningIcon}>
                <CustomTooltip 
                  tooltipText="You are in offline mode. The data may not be up to date."
                  textColor="#fff"
                  backgroundColor="rgb(61, 61, 61)"
                >
                  <WarningIcon size={24} fill={'#f54242'} />
                </CustomTooltip>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
  },
  menuIcon: {
    marginRight: 20,
    marginLeft: 5,
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  iconsRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  warningIcon: {
    marginRight: 10,
  },
  updateIcon: {
    marginRight: 10,
  },
});

export default Header;
