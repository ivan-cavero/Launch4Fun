import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Tooltip } from 'react-native-elements';

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

const styles = StyleSheet.create({
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
});

export default DateStatusContainer;
