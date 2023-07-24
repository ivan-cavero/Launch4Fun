import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, useColorScheme } from "react-native";

import { configureStore } from '@reduxjs/toolkit';
import configurationReducer, { setTheme} from './src/store/configuration';
import { Provider, useDispatch } from 'react-redux';

import UpcomingLaunchList from "./src/components/Launches/UpcomingLaunchList";
import RocketIcon from "./src/components/Icons/RocketIcon";
import PastLaunchList from "./src/components/Launches/PastLaunchList";
import HistoryIcon from "./src/components/Icons/HistoryIcon";
import Header from "./src/components/Header/Header";
import ConfigurationView from "./src/components/Configuration/ConfigurationView";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const store = configureStore({
  reducer: {
    configuration: configurationReducer,
  },
});

const App = () => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  dispatch(setTheme(scheme));

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const createScreenOptions = ({ route }) => ({
    tabBarActiveTintColor: '#0074B7',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      backgroundColor: '#fff',
      paddingBottom: 2,
    },
    tabBarItemStyle: {
      paddingTop: 8, 
    },
  
    tabBarIcon: ({ color, size }) => {
      const iconComponent = route.name === 'Upcoming' ? (
        <RocketIcon size={size} color={color} />
      ) : (
        <HistoryIcon size={size} color={color} />
      );
  
      return iconComponent;
    },
  });

  const HomeScreen = ({ navigation }) => (
    <Tab.Navigator swipeEnabled={true} screenOptions={createScreenOptions}>
      <Tab.Screen name="Upcoming" component={UpcomingLaunchList} options={{ header: () => <Header navigation={navigation} /> }} />
      <Tab.Screen name="Past" component={PastLaunchList} options={{ header: () => <Header navigation={navigation} /> }} />
    </Tab.Navigator>
  );

  const ConfigurationScreen = ({ navigation }) => (
    <React.Fragment>
      <Header navigation={navigation} />
      <ConfigurationView />
    </React.Fragment>
  );  

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <HeaderDrawer />
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }}></View>
      <FooterDrawer />
    </DrawerContentScrollView>
  );

  const HeaderDrawer = () => (
    <React.Fragment>
      <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}>Launch4Fun</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 20 }}></View>
    </React.Fragment>
  );

  const FooterDrawer = () => (
    <React.Fragment>
      <View style={{ borderTopWidth: 1, borderTopColor: 'gray', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, marginRight: 5 }}>Developed by Ivan Cavero</Text>
        <Text style={{ fontSize: 10 }}>❤️</Text>
      </View>
    </React.Fragment>
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Configuration" component={ConfigurationScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
