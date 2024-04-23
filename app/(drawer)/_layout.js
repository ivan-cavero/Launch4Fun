import DrawerContent from '@/components/Drawer/DrawerContent'
import DrawerFooter from '@/components/Drawer/DrawerFooter'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useTheme from '@/styles/useTheme'

export default function Layout() {
  const insets = useSafeAreaInsets()
  const DrawerContentMemo = React.memo(DrawerContent)
  const DrawerFooterMemo = React.memo(DrawerFooter)
  const appTheme = useTheme()

  const CustomDrawerContent = (props) => {
    return (
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: appTheme.bg200 }]}>
        <DrawerContentMemo {...props} />
        <DrawerFooterMemo />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: appTheme.bg100 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: appTheme.bg200 },
          headerTintColor: appTheme.text100,
          title: 'Launch4Fun'
        }}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#1E1E1E'
  }
})
