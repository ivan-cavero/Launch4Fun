import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistanceToNow,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Tooltip } from 'react-native-elements';

const RocketImage = ({ uri }) => (
  <Image
    style={styles.rocketImage}
    source={{ uri }}
    resizeMode="cover"
  />
);

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

const DateStatusContainer = ({ launchDate, status, statusBackgroundColor }) => {
  const tooltipText = status === 'Go for Launch' ? 'Launch is confirmed and scheduled.' : 'Launch is to be confirmed.';

  return (
    <View style={styles.dateStatusContainer}>
      <Text style={styles.date}>{format(launchDate, 'MMM dd, yyyy, HH:mm')}</Text>
      <Tooltip
        popover={<Text style={{ color: "#fff" }}>{tooltipText}</Text>}
        backgroundColor="rgb(61, 61, 61)"
        height={60}
        width={200}
        overlayColor="rgba(0, 0, 0, 0)"
      >
        <View style={[styles.statusContainer, { backgroundColor: statusBackgroundColor }]}>
          <Text style={styles.status}>{status === 'Go for Launch' ? 'GO' : 'TBC'}</Text>
        </View>
      </Tooltip>
    </View>
  );
};



const LaunchItem = ({ launch }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const launchDate = utcToZonedTime(launch.net, timeZone);
  const daysUntilLaunch = differenceInCalendarDays(launchDate, new Date());

  const timeRemaining = () => {
    if (daysUntilLaunch > 1) {
      return formatDistanceToNow(launchDate, { addSuffix: true });
    } else {
      const hours = differenceInHours(launchDate, new Date());
      const minutes = differenceInMinutes(launchDate, new Date()) % 60;
      if (hours >= 1) {
        return `in ${hours}h ${minutes}m`;
      } else {
        const seconds = differenceInSeconds(launchDate, new Date()) % 60;
        if (minutes >= 1) {
          return `in ${minutes}m ${seconds}s`;
        } else {
          return seconds <= 0 ? "Waiting confirmation..." : `in ${seconds}s`;
        }
      }
    }
  };
    

  const [timeRemainingState, setTimeRemaining] = useState(timeRemaining());

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
  

  const statusBackgroundColor = launch.status.name === 'Go for Launch' ? '#32CD32' : '#FFA500';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <RocketImage uri={launch.image} />
        <DetailsContainer
          name={launch.name}
          location={launch.pad.location.name}
          launchDate={launchDate}
          status={launch.status.name}
          statusBackgroundColor={statusBackgroundColor}
          timeRemaining={timeRemainingState}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 13,
    marginTop: 15,
  },
  card: {
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 134,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  rocketImage: {
    width: '30%',
    height: '100%'
  },
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
  dateStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0074B7',
    marginRight: 5,
  },
  statusContainer: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
  },
  status: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
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
  imageContainer: {
    width: 100,
    height: '100%',
    position: 'relative',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LaunchItem;
