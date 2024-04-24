import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import useTheme from '@/styles/useTheme'

const { width } = Dimensions.get('window')
const isLargeScreen = width >= 768

const LaunchDetail = ({ launch }) => {
  const appTheme = useTheme()

  const renderDetailItem = (label, content) => {
    if (!content) return null;
    return (
      <View style={styles.detailItem} key={label}>
        <Text style={[styles.detailLabel, { color: appTheme.text100 }]}>{label}:</Text>
        <Text style={[styles.detailContent, { color: appTheme.text200 }]}>{content}</Text>
      </View>
    )
  }

  const renderSection = (title, description, data) => (
    <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} key={title}>
      <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{title}</Text>
      <Text style={[styles.sectionDescription, { color: appTheme.text200 }]}>{description}</Text>
      {data.map(item => renderDetailItem(item.label, item.content))}
    </View>
  )

  const renderLiveSection = () => (
    <View style={[styles.section, { backgroundColor: appTheme.bg200 }]}>
      <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>Live Stream</Text>
      <Text style={[styles.sectionDescription, { color: appTheme.text200 }]}>Watch the launch live stream here when available.</Text>
      <View style={styles.livePlaceholder}>
        <Text style={[styles.liveText, { color: appTheme.text200 }]}>Live stream will be shown here.</Text>
      </View>
      {!launch.webcast_live && (
        <TouchableOpacity style={styles.submitButton}>
          <Text style={[styles.submitButtonText, { color: appTheme.text100 }]}>Submit Live Stream URL</Text>
        </TouchableOpacity>
      )}
    </View>
  )

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: appTheme.bg100 }]}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: launch.image }} resizeMode={isLargeScreen ? 'center' : 'cover'} />
        <Text style={[styles.launchTitle, { color: appTheme.text100 }]} numberOfLines={1} ellipsizeMode='tail'>
          {launch.name}
        </Text>
        <Text style={[styles.status, { color: appTheme.text200 }]}>Status: {launch.status?.name || 'Unknown'}</Text>

        <View style={styles.sectionsContainer}>
          {renderLiveSection()}
          {renderSection('Mission Details', launch.mission?.description, [
            { label: 'Orbit', content: launch.mission?.orbit?.name },
            { label: 'Type', content: launch.mission?.type },
            { label: 'Weather Concerns', content: launch.weather_concerns }
          ])}
          {renderSection('Rocket Details', launch.rocket?.configuration?.full_name, [
            { label: 'Family', content: launch.rocket?.configuration?.family },
            { label: 'Variant', content: launch.rocket?.configuration?.variant }
          ])}
          {renderSection('Launch Info', 'Detailed launch timeline and window.', [
            { label: 'Launch Pad', content: launch.pad?.name },
            { label: 'Window Start', content: launch.window_start },
            { label: 'Window End', content: launch.window_end },
            { label: 'Probability', content: `${launch.probability}%` }
          ])}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20
  },
  sectionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  image: {
    width: '100%',
    aspectRatio: isLargeScreen ? 2 : 1.5,
    resizeMode: 'cover'
  },
  launchTitle: {
    fontSize: 24,
    padding: 5,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  status: {
    fontSize: 18,
    paddingBottom: 10,
    maxWidth: width - 20
  },
  section: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '90%'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 10
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600'
  },
  detailContent: {
    fontSize: 16,
    flexShrink: 1,
    paddingLeft: 4
  },
  livePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10
  },
  liveText: {
    fontSize: 16,
    marginTop: 10
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  submitButtonText: {
    fontSize: 18
  }
})

export default LaunchDetail
