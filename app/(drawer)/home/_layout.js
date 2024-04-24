import useTheme from '@/styles/useTheme'
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router'
import React from 'react'

export default function HomeLayout() {
  const appTheme = useTheme();

  const tabs = [
    {
      name: 'upcoming',
      title: 'Upcoming',
      icon: 'rocket'
    },
    {
      name: 'previous',
      title: 'Previous',
      icon: 'back-in-time'
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
            tabBarIcon: () => <Entypo name={tab.icon} size={24} color={appTheme.text100} />,
            title: tab.title
          }}
        />
      ))}
    </Tabs>
  )
}
