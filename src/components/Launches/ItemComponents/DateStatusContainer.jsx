import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import CustomTooltip from '../../Reusable/CustomTooltip';

const getStatusBackgroundColor = (statusName) => {
  switch (statusName) {
    case 'Go for Launch':
      return '#32CD32';
    case 'Launch Successful':
      return '#0074B7';
    case 'Launch Failure':
      return '#FFA500';
    case 'To Be Determined':
      return '#808080';
    case 'To Be Confirmed':
      return '#FFD700';
    default:
      return '#808080';
  }
};

const getStatusText = (statusName) => {
  switch (statusName) {
    case 'Go for Launch':
      return 'GO';
    case 'Launch Successful':
      return 'LS';
    case 'Launch Failure':
      return 'LF';
    case 'To Be Determined':
      return 'TBD';
    case 'To Be Confirmed':
      return 'TBC';
    default:
      return statusName;
  }
};

const DateStatusContainer = ({ launchDate, status, statusDescription }) => {
  const [tooltipSize, setTooltipSize] = useState({ width: 200, height: 60 });
  const statusBackgroundColor = getStatusBackgroundColor(status);
  const statusText = getStatusText(status);

  const tooltipContent = (
    <Text
      style={{ color: "#fff" }}
      onLayout={(e) =>
        setTooltipSize({
          width: e.nativeEvent.layout.width + 30,
          height: e.nativeEvent.layout.height + 30,
        })
      }
    >
      {statusDescription ?? "N/A"}
    </Text>
  );

  return (
    <View style={styles.dateStatusContainer}>
      <Text style={styles.date}>{format(launchDate, 'MMM dd, yyyy, HH:mm')}</Text>
      <CustomTooltip
        backgroundColor="rgb(61, 61, 61)"
        textColor="#fff"
        tooltipText={statusDescription}
      >
        <View style={[styles.statusContainer, { backgroundColor: statusBackgroundColor }]}>
          <Text style={styles.status}>{statusText}</Text>
        </View>
      </CustomTooltip>
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
