import useTheme from '@/styles/useTheme'
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router'
import React from 'react'
import i18nManager from '@/locales';

export default function HomeLayout() {
  const appTheme = useTheme()
  const i18n = i18nManager.getInstance()

  const tabs = [
    {
      name: 'upcoming',
      title: i18n.t('upcomingTabLabel'),
      icon: 'rocket'
    },
    {
      name: 'previous',
      title: i18n.t('previousTabLabel'),
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
            tabBarIcon: ({ color }) => <Entypo name={tab.icon} size={24} color={color} />,
            title: tab.title
          }}
        />
      ))}
    </Tabs>
  )
}
