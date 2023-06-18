import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { getPastLaunches } from '../../services/launchService';
import LaunchItem from './LaunchItem';

const PastLaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetchPastLaunches();
  }, []);

  const fetchPastLaunches = async () => {
    const data = await getPastLaunches();
    setLaunches(data.results);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={launches}
        renderItem={({ item }) => <LaunchItem launch={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default PastLaunchList;
