import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Share } from 'react-native';
import { differenceInCalendarDays, differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceToNow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/favorites';
import { useColorScheme } from 'react-native';

import RocketImage from './ItemComponents/RocketImage';
import DetailsContainer from './ItemComponents/DetailsContainer';

const LaunchItem = React.memo(({ launch, past }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const launchDate = utcToZonedTime(launch.net, timeZone);
  const daysUntilLaunch = differenceInCalendarDays(launchDate, new Date());

  const timeRemaining = () => {
    if (past) {
      return formatDistanceToNow(launchDate, { addSuffix: false });
    }
  
    const hours = differenceInHours(launchDate, new Date());
    const minutes = differenceInMinutes(launchDate, new Date()) % 60;
    const seconds = differenceInSeconds(launchDate, new Date()) % 60;
  
    if (daysUntilLaunch > 1) {
      return formatDistanceToNow(launchDate, { addSuffix: true });
    }
  
    if (hours >= 1) {
      return `in ${hours}h ${minutes}m`;
    }
  
    if (minutes >= 1) {
      return `in ${minutes}m ${seconds}s`;
    }
  
    return seconds <= 0 ? "Waiting confirmation..." : `in ${seconds}s`;
  };
  

  const [timeRemainingState, setTimeRemaining] = useState(timeRemaining());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkTheme = useSelector((state) => state.configuration?.theme);
  const scheme = checkTheme ?? useColorScheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = timeRemaining();
      if (newTimeRemaining !== "Waiting confirmation") {
        setTimeRemaining(newTimeRemaining);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === launch.id);
  const [isInFavorites, setIsInFavorites] = useState(isFavorite);

  const dispatch = useDispatch();
  const handleAddOrRemoveFavorites = () => {
    if (isInFavorites) {
      const action = removeFromFavorites(launch);
      dispatch(action);
    } else {
      const action = addToFavorites(launch);
      dispatch(action);
    }
    setIsInFavorites(!isInFavorites);
  };

  const DOMAIN = 'https://launch4fun.com/';
  const shareUrl = async () => {
    const url = `${DOMAIN}${launch.name.replace(/ /g, '-')}`;
    const shareOptions = {
      title: 'Launch4Fun',
      message: `Check out this launch: ${launch.name} -> ${url}`,
      url
    };
    try {
      await Share.share(shareOptions);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const styles = StyleSheet.create({
    cardContainer: {
      paddingHorizontal: 13,
      marginTop: 15,
      flex: 1,
    },
    card: {
      flexDirection: 'row-reverse',
      backgroundColor: scheme === 'dark' ? '#333' : 'white',
      borderRadius: 10,
      overflow: 'hidden',
      width: '100%',
      minHeight: 130,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    touchable: {
      flex: 1,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableHighlight
        onLongPress={() => setIsMenuOpen(true)}
        underlayColor={scheme === 'dark' ? '#444' : '#f2f2f2'} 
        style={styles.touchable}
      >
        <View style={styles.card}>
          <RocketImage uri={launch.image} isFavorite={isInFavorites} />
          <DetailsContainer
            name={launch.name}
            agency={launch.launch_service_provider.name}
            launchDate={launchDate}
            status={launch.status.name}
            statusDescription={launch.status.description}
            timeRemaining={timeRemainingState}
          />
          <Menu opened={isMenuOpen} onBackdropPress={() => setIsMenuOpen(false)}>
            <MenuTrigger />
            <MenuOptions>
              <MenuOption onSelect={handleAddOrRemoveFavorites}><Text>{isInFavorites ? 'Remove from favorites' : 'Add to favorites'}</Text></MenuOption>
              <MenuOption onSelect={shareUrl}><Text>Share</Text></MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableHighlight>
    </View>
  );
});

export default LaunchItem;
