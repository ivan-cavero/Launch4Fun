import { Stack } from 'expo-router'
import useTheme from '@/styles/useTheme'

export default function Layout() {
  const appTheme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: appTheme.bg200 },
        headerTintColor: appTheme.text100
      }}
    />
  )
}
