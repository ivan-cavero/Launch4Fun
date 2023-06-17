import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Header from './src/components/Header';
import UpcomingLaunchList from './src/components/Launches/UpcomingLaunchList';
import PastLaunchList from './src/components/Launches/PastLaunchList';
import RocketIcon from './src/components/Icons/RocketIcon';
import HistoryIcon from './src/components/Icons/HistoryIcon';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <Tab.Navigator
          initialRouteName="Upcoming"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarStyle: { height: 50, paddingBottom: 2 },
            tabBarLabelStyle: { fontSize: 12 },
          }}
        >
          <Tab.Screen
            name="Upcoming"
            component={UpcomingLaunchList}
            options={{
              tabBarIcon: ({ focused }) => (
                <RocketIcon
                  size={24}
                  color={focused ? '#0074B7' : 'gray'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Past"
            component={PastLaunchList}
            options={{
              tabBarIcon: ({ focused }) => (
                <HistoryIcon
                  size={24}
                  color={focused ? '#0074B7' : 'gray'}
                />
              ),
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
