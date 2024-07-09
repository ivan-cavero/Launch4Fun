import { usePathname, useRouter } from 'expo-router'
import { useCallback } from 'react'

import DrawerItem from './DrawerItem'

import i18nManager from '@/locales';

const DrawerContent = () => {
  const currentPath = usePathname()
  const router = useRouter()
  const i18n = i18nManager.getInstance()

  const menuItems = [
    {
      path: '/home',
      label: i18n.t('homeLabel'),
      iconName: 'home',
      iconFamily: 'Octicons',
      notificationsCount: 0
    },
    {
      path: '/settings',
      label: i18n.t('settingsLabel'),
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
