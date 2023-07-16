import React from "react";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from "react-native";

import UpcomingLaunchList from "./src/components/Launches/UpcomingLaunchList";
import RocketIcon from "./src/components/Icons/RocketIcon";
import PastLaunchList from "./src/components/Launches/PastLaunchList";
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
      <Tab.Screen name="Home" component={UpcomingLaunchList} options={{ header: () => <Header navigation={navigation} /> }} />
      <Tab.Screen name="Favorites" component={PastLaunchList} options={{ header: () => <Header navigation={navigation} /> }} />
    </Tab.Navigator>
  );

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <HeaderDrawer />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Configuration"
        onPress={() => props.navigation.closeDrawer()}
        disabled={true}
      />
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
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
