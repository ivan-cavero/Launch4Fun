import { Stack } from 'expo-router'
import React from 'react'
import { useSelector } from 'react-redux'
import LaunchDetail from '@/components/Launch/LaunchDetail'

export default function Page() {
  const selectedLaunch = useSelector((state) => state.selectedLaunch.selectedLaunch)

  return (
    <>
      <Stack.Screen
        options={{
          title: selectedLaunch.name || 'Launch Details'
        }}
      />
      <LaunchDetail launch={selectedLaunch} />
    </>
  )
}
