import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { osName } from 'expo-device'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native'
import useTheme from '@/styles/useTheme'
import i18nManager from '@/locales';

export default function ConfigPage() {
  const i18n = i18nManager.getInstance()
  const appTheme = useTheme()
  const appVersion = Constants.expoConfig.version

  const handleClearCache = async () => {
    try {
      await AsyncStorage.clear()
      dispatch(clearAllCalendarEvents())
    } catch (error) {
      console.error('Error in clearing cache:', error)
    }
  }

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: appTheme.bg100 }]}>
      <View style={styles.container}>
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]}>
          <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{i18n.t('cache')}</Text>
          <View style={styles.descriptionRow}>
            <Text style={[styles.descriptionText, { color: appTheme.text200 }]}>{i18n.t('clearingCacheDescription')}</Text>
          </View>
          <TouchableOpacity style={[styles.clearCacheButton, { backgroundColor: appTheme.accent100 }]} onPress={handleClearCache}>
            <Text style={[styles.clearCacheButtonText, { color: appTheme.text100 }]}>{i18n.t('clearCache')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, { backgroundColor: appTheme.bg200 }]}>
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
  }
})
