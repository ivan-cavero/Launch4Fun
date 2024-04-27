import DrawerContent from '@/components/Drawer/DrawerContent'
import DrawerFooter from '@/components/Drawer/DrawerFooter'
import useTheme from '@/styles/useTheme'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import i18nManager from '@/locales';

export default function Layout() {
  const insets = useSafeAreaInsets()
  const DrawerContentMemo = React.memo(DrawerContent)
  const DrawerFooterMemo = React.memo(DrawerFooter)
  const appTheme = useTheme()
  const i18n = i18nManager.getInstance()

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
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Home',
            title: 'Launch4Fun'
          }}
        />
        <Drawer.Screen
          name="settings/index"
          options={{
            drawerLabel: 'Settings',
            title: i18n.t('settingsLabel')
          }}
        />
      </Drawer>
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
