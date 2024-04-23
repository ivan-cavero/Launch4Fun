import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DrawerFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.separator} />
      <Text style={styles.developedByText}>Developed by Ivan Cavero ❤️</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 'auto',
    paddingTop: 20
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(145, 145, 145)',
    marginBottom: 10
  },
  developedByText: {
    fontSize: 14,
    color: 'rgb(145, 145, 145)',
    textAlign: 'center',
    marginBottom: 10
  }
})

export default DrawerFooter
