import { MaterialCommunityIcons, MaterialIcons, Feather, Octicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import useTheme from '@/styles/useTheme';

const DrawerItem = ({ iconName, label, notificationsCount, isFocused, iconFamily, onPress }) => {
  const appTheme = useTheme();
  
  const iconFamilies = {
    MaterialCommunityIcons,
    MaterialIcons,
    Feather,
    Octicons
  }

  const Icon = iconFamilies[iconFamily] || MaterialIcons

  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, isFocused && styles.focusedContainer, { backgroundColor: isFocused ? 'rgba(100, 100, 100, 0.1)' : appTheme.bg200 }]}>
      <Icon name={iconName} size={24} color={isFocused ? '#4480FF' : appTheme.text100} />
      <Text style={[styles.label, isFocused && styles.focusedLabel, { color: isFocused ? '#6797fd' : appTheme.text100 }]}>{label}</Text>
      {notificationsCount > 0 && (
        <View style={styles.notificationBubble}>
          <Text style={styles.notificationText}>{notificationsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    marginVertical: 4
  },
  focusedContainer: {
    backgroundColor: 'rgba(100, 100, 100, 0.1)'
  },
  label: {
    marginLeft: 15,
    flex: 1
  },
  focusedLabel: {
    color: '#6797fd'
  },
  notificationBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4480FF'
  },
  notificationText: {
    fontSize: 12,
    color: 'white'
  }
})

export default DrawerItem
