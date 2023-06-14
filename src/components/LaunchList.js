import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, View , StyleSheet} from 'react-native';
import LaunchItem from './LaunchItem';
import { getUpcomingLaunches } from '../services/launchService';
import ErrorView from '../utils/ErrorView';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState('idle');
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      loadMoreLaunches();
    }
  }, []);

  const loadMoreLaunches = useCallback(async () => {
    if (status === 'loading') {
      return;
    }
  
    setStatus('loading');
    try {
      const response = await getUpcomingLaunches(offset);
      const sortedLaunches = [...launches, ...response.results].sort((a, b) => {
        return new Date(a.net) - new Date(b.net);
      });
      setLaunches(sortedLaunches);
      setOffset((prevOffset) => prevOffset + 10);
      setApiError(null);
    } catch (error) {
      console.error('Error fetching launches:', error);
      setApiError('Error with API: ' + error.message);
    } finally {
      setStatus('idle');
    }
  }, [offset, status, launches]);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setOffset(0);
    setLaunches([]);
    setApiError(null);
    await loadMoreLaunches();
    setRefreshing(false);
  }, [loadMoreLaunches]);

  const renderItem = ({ item }) => <LaunchItem launch={item} />;

  if (apiError) {
    return <ErrorView errorMessage={apiError} />;
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={launches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreLaunches}
        onEndReachedThreshold={0.9}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {status === 'loading' && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#0074B7" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default LaunchList;
