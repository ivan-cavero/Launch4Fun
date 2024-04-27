import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import i18nManager from '@/locales'

const DrawerFooter = () => {
  const i18n = i18nManager.getInstance()
  return (
    <View style={styles.footerContainer}>
      <View style={styles.separator} />
      <Text style={styles.developedByText}>{i18n.t('footerTitle')}</Text>
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
