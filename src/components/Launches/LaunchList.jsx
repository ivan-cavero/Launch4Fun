import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import LaunchItem from './LaunchItem';
import ErrorView from '../../utils/ErrorView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LaunchList = ({ loadData, sortOrder = 'asc' }) => {
  const [launches, setLaunches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState('idle');
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      loadMoreLaunches();
    }
  }, []);

  const storeLaunches = async (launches) => {
    try {
      await AsyncStorage.setItem('@launches', JSON.stringify(launches));
    } catch (error) {
      console.error('Error saving launches:', error);
    }
  };  

  const getStoredLaunches = async () => {
    try {
      const storedLaunches = await AsyncStorage.getItem('@launches');
      if (storedLaunches !== null) {
        setLaunches(JSON.parse(storedLaunches));
      }
    } catch (error) {
      console.error('Error getting launches:', error);
    }
  };  

  const loadMoreLaunches = useCallback(async () => {
    if (status === 'loading') {
      return;
    }

    setStatus('loading');
    setLoadingMore(true);
    try {
      const response = await loadData(offset);
      const sortedLaunches = [...launches, ...response.results].sort((a, b) => {
        return sortOrder === 'asc'
          ? new Date(a.net) - new Date(b.net)
          : new Date(b.net) - new Date(a.net);
      });
      setLaunches(sortedLaunches);
      storeLaunches(sortedLaunches)
      setOffset((prevOffset) => prevOffset + 10);
      setApiError(null);
    } catch (error) {
      console.error('Error fetching launches:', error);
      getStoredLaunches();
    } finally {
      setStatus('idle');
      setLoadingMore(false);
    }
  }, [offset, status, launches, loadData, sortOrder]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setOffset(0);
    setLaunches([]);
    setApiError(null);
    await loadMoreLaunches();
    setRefreshing(false);
  }, [loadMoreLaunches]);

  const renderItem = ({ item }) => sortOrder === 'asc' 
    ? <LaunchItem launch={item}/> 
    : <LaunchItem launch={item} past={true} />

  const renderFooter = () => {
    if (!loadingMore || launches.length === 0) return null;

    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator size="small" color="#0074B7" />
      </View>
    );
  };

  if (apiError) {
    return <ErrorView errorMessage={apiError} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={launches}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMoreLaunches}
        onEndReachedThreshold={Platform.OS === 'web' ? 1 : 0.9}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
      />
      {status === 'loading' && launches.length === 0 && (
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
  footerLoading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});

export default LaunchList;
