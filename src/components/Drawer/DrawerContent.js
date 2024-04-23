import { usePathname, useRouter } from 'expo-router'
import React, { useCallback } from 'react'

import DrawerItem from './DrawerItem'

const DrawerContent = () => {
  const currentPath = usePathname()
  const router = useRouter()

  const menuItems = [
    {
      path: '/home',
      label: 'Home',
      iconName: 'home',
      iconFamily: 'Octicons',
      notificationsCount: 2
    },
    {
      path: '/premium',
      label: 'Premium',
      iconName: 'star',
      iconFamily: 'Feather ',
      notificationsCount: 0
    },
    {
      path: '/settings',
      label: 'Settings',
      iconName: 'settings',
      iconFamily: 'Feather',
      notificationsCount: 0
    }
  ]

  const handlePress = useCallback(
    (path) => {
      router.push(path)
    },
    [router]
  )

  return (
    <>
      {menuItems.map((item) => (
        <DrawerItem
          key={item.path}
          iconName={item.iconName}
          label={item.label}
          notificationsCount={item.notificationsCount}
          isFocused={currentPath.includes(item.path)}
          onPress={() => handlePress(item.path)}
        />
      ))}
    </>
  )
}

export default DrawerContent
