import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
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
    <View>
      <FlatList
        data={launches}
        renderItem={({ item }) => <LaunchItem launch={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PastLaunchList;
