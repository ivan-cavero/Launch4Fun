import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { osName } from 'expo-device'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import useTheme from '@/styles/useTheme'

export default function ConfigPage() {
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cache</Text>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionText}>Clearing cache will remove favorites, quick loads, and calendar events.</Text>
          </View>
          <TouchableOpacity style={styles.clearCacheButton} onPress={handleClearCache}>
            <Text style={styles.clearCacheButtonText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Info</Text>
          <Text style={styles.infoText}>OS: {osName}</Text>
          <Text style={styles.infoText}>Client Version: {appVersion}</Text>
          <Text style={styles.infoText}>Feature: Alpha</Text>
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
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  infoText: {
    fontSize: 16,
    color: '#BBB',
    marginTop: 10
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  descriptionText: {
    fontSize: 14,
    color: '#BBB',
    marginLeft: 10,
    marginRight: 15,
    flexShrink: 1
  },
  optionButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10
  },
  clearCacheButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  clearCacheButtonText: {
    color: '#FFF',
    fontSize: 18
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  optionText: {
    fontSize: 18,
    color: '#FFF',
    flex: 1
  }
})
