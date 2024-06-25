import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { osName } from 'expo-device'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Switch } from 'react-native'
import useTheme from '@/styles/useTheme'
import i18nManager from '@/locales'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import { updateLanguage, updateAutoTranslate } from '@/store/user'
import React, { useState } from 'react'
import { checkTranslateApi } from '@/utils/translate'

export default function ConfigPage() {
  const dispatch = useDispatch()
  const i18n = i18nManager.getInstance()
  const appTheme = useTheme()
  const appVersion = Constants.expoConfig.version
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale)
  const [autoTranslate, setAutoTranslate] = useState(useSelector((state) => state.user.preferences.autoTranslate || false))

  const handleClearCache = async () => {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error('Error in clearing cache:', error)
    }
  }

  const toggleAutoTranslate = async (value) => {
    setAutoTranslate(value)
    dispatch(updateAutoTranslate(value))
  }

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: appTheme.bg100 }]} accessibilityLabel="Configuration page scroll view">
      <View style={styles.container} accessibilityLabel="Configuration page container">
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} accessibilityLabel="Clear cache section">
          <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{i18n.t('cache')}</Text>
          <View style={styles.descriptionRow}>
            <Text style={[styles.descriptionText, { color: appTheme.text200 }]}>{i18n.t('clearingCacheDescription')}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.clearCacheButton, { backgroundColor: appTheme.accent100 }]} 
            onPress={handleClearCache}
            accessibilityLabel="Clear cache button"
          >
            <Text style={[styles.clearCacheButtonText, { color: appTheme.text100 }]}>{i18n.t('clearCache')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} accessibilityLabel="Language selection section">
          <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{i18n.t('language')}</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => {
              setSelectedLanguage(itemValue)
              i18nManager.setLocale(itemValue)
              dispatch(updateLanguage(itemValue))
            }}
            style={{ color: appTheme.text200 }}
            dropdownIconColor={appTheme.text200}
            accessibilityLabel="Language picker"
          >
            <Picker.Item label="English" value="en-US" />
            <Picker.Item label="Español" value="es-ES" />
            <Picker.Item label="Deutsch" value="de-DE" />
            <Picker.Item label="Français" value="fr-FR" />
            <Picker.Item label="日本語" value="ja-JP" />
            <Picker.Item label="Português" value="pt-BR" />
            <Picker.Item label="Italiano" value="it-IT" />
          </Picker>
          {selectedLanguage !== 'en-US' && (
            <View style={styles.switchContainer} accessibilityLabel="Auto-translate switch">
              <Text style={[styles.infoText, { color: appTheme.text200, flex: 1 }]}>{i18n.t('autoTranslate')}</Text>
              <Switch
                value={autoTranslate}
                onValueChange={(value) => toggleAutoTranslate(value)}
              />
            </View>
          )}
          {selectedLanguage !== 'en-US' && (
            <Text style={[styles.disclaimerText, { color: appTheme.text200 }]} accessibilityLabel="Auto-translate disclaimer">
              {i18n.t('autoTranslateDisclaimer')}
            </Text>
          )}
        </View>
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} accessibilityLabel="Status section">
          <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>Status</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.infoText, { color: appTheme.text200 }]}>Translate API:</Text>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              {checkTranslateApi() 
                ? <View style={{ backgroundColor: 'green', width: 15, height: 15, borderRadius: 7.5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 }} accessibilityLabel="Translate API status: online"/> 
                : <View style={{ backgroundColor: 'red', width: 15, height: 15, borderRadius: 7.5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 }} accessibilityLabel="Translate API status: offline" />
              }
            </View>
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} accessibilityLabel="App info section">
          <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{i18n.t('appInfo')}</Text>
          <Text style={[styles.infoText, { color: appTheme.text200 }]}>OS: {osName}</Text>
          <Text style={[styles.infoText, { color: appTheme.text200 }]}>{i18n.t('clientVersion')}: {appVersion}</Text>
          <Text style={[styles.infoText, { color: appTheme.text200 }]}>Feature: Alpha</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20,
    paddingBottom: 30
  },
  section: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      }
    })
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  infoText: {
    fontSize: 16,
    marginTop: 10
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  descriptionText: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 15,
    flexShrink: 1
  },
  clearCacheButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  clearCacheButtonText: {
    fontSize: 18
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disclaimerText: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic'
  }
})
