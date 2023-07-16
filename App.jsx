import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import UpcomingLaunchList from "./src/components/Launches/UpcomingLaunchList";
import PastLaunchList from "./src/components/Launches/PastLaunchList";
import RocketIcon from "./src/components/Icons/RocketIcon";
import HistoryIcon from "./src/components/Icons/HistoryIcon";
import Header from "./src/components/Header/Header";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{headerShown: false}}
        >
          <Drawer.Screen name="Launch4Fun" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

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

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem
      label="Close drawer"
      onPress={() => props.navigation.closeDrawer()}
    />
  </DrawerContentScrollView>
);

export default App;
