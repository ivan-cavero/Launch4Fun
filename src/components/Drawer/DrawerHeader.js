import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DrawerHeader = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const navigateToProfileOrLogin = () => {
      router.push('/profile')
  }

  return (
    <View style={{ paddingTop: insets.top }}>
      <TouchableOpacity onPress={navigateToProfileOrLogin}>
        <View style={styles.profileContainer}>
          <View style={styles.userDetails}>
            <Text style={styles.profileName}>{'Guest'}</Text>
            <Text style={[styles.profileEmail, { textDecorationLine: 'underline' }]}>Login / Register</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userDetails: {
    marginLeft: 15
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileEmail: {
    color: 'white',
    fontSize: 14
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(145, 145, 145)',
    marginBottom: 10
  }
})

export default DrawerHeader
