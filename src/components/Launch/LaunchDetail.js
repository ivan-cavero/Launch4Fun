import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions, ActivityIndicator, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const { width } = Dimensions.get('window')
const isLargeScreen = width >= 768

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const LaunchDetail = ({ launch }) => {
  if (!launch) {
    return <ActivityIndicator size='large' color='#ffffff' />
  }

  const renderDetailItem = (label, content, Icon) => {
    if (!content) return null
    return (
      <View style={styles.detailItem} key={label}>
        {Icon && <Icon size={18} color='#BBB' style={styles.detailIcon} />}
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailContent}>{content}</Text>
      </View>
    )
  }

  const renderSection = (title, description, data) => (
    <View style={styles.section} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      {data.map((item, index) => renderDetailItem(item.label, item.content, item.Icon, index))}
    </View>
  )

  const renderLiveSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Stream</Text>
        <Text style={styles.sectionDescription}>Watch the launch live stream here when available.</Text>
        <View style={styles.livePlaceholder}>
          <Text style={styles.liveText}>Live stream will be shown here.</Text>
        </View>
        {!launch.webcast_live && (
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Live Stream URL</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: launch.image }} resizeMode={isLargeScreen ? 'center' : 'cover'} />
        <Text style={styles.launchTitle} numberOfLines={1} ellipsizeMode='tail'>
          {launch.name}
        </Text>
        <Text style={styles.status}>Status: {launch.status?.name || 'Unknown'}</Text>

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
          { label: 'Window Start', content: formatDate(launch.window_start) },
          { label: 'Window End', content: formatDate(launch.window_end) },
          { label: 'Probability', content: `${launch.probability}%` }
        ])}

        {Platform.OS !== 'web' && launch.pad?.map_url && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: Number.parseFloat(launch.pad.latitude),
                longitude: Number.parseFloat(launch.pad.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number.parseFloat(launch.pad.latitude),
                  longitude: Number.parseFloat(launch.pad.longitude)
                }}
              />
            </MapView>
          </View>
        )}

        {Platform.OS === 'web' && <Text style={styles.mapPlaceholder}>Map visualization is disabled in web version.</Text>}

        <TouchableOpacity onPress={() => Linking.openURL(launch.pad?.wiki_url || '')} style={styles.learnMore}>
          <Text style={styles.learnMoreText}>Learn more on Wikipedia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20
  },
  image: {
    width: '100%',
    aspectRatio: isLargeScreen ? 2 : 1.5,
    resizeMode: 'cover'
  },
  launchTitle: {
    fontSize: 24,
    padding: 5,
    color: '#FFF',
    fontWeight: 'bold',
    paddingVertical: 10
  },
  status: {
    fontSize: 18,
    color: '#BBB',
    paddingBottom: 10,
    maxWidth: width - 20
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10
  },
  section: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '90%'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF'
  },
  sectionDescription: {
    fontSize: 14,
    color: '#BBB',
    marginBottom: 10
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  detailLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  detailContent: {
    color: '#BBB',
    fontSize: 16,
    flexShrink: 1,
    paddingLeft: 4
  },
  detailIcon: {
    marginRight: 5
  },
  learnMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  learnMoreText: {
    color: '#BBB',
    fontSize: 16,
    marginLeft: 5
  },
  mapContainer: {
    width: '90%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  livePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333',
    borderRadius: 10
  },
  liveText: {
    fontSize: 16,
    color: '#BBBBBB',
    marginTop: 10
  },
  submitButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18
  }
})

export default LaunchDetail
