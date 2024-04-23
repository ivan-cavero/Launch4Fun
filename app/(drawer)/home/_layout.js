import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import useTheme from '@/styles/useTheme'

export default function HomeLayout() {
  const appTheme = useTheme();

  const tabs = [
    {
      name: 'index',
      title: 'Upcoming',
      icon: <Entypo name="rocket" size={24} color={appTheme.text100} />
    }
  ]

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appTheme.bg200
        },
        tabBarActiveTintColor: appTheme.text100,
        tabBarInactiveTintColor: appTheme.text200
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: () => tab.icon,
            title: tab.title
          }}
        />
      ))}
    </Tabs>
  )
}
