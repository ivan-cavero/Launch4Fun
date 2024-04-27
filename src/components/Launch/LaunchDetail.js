import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import useTheme from '@/styles/useTheme'
import i18nManager from '@/locales'
import { formatDateToLocal } from '@/utils/dateUtils'

const { width } = Dimensions.get('window')
const isLargeScreen = width >= 768

const LaunchDetail = ({ launch }) => {
  const appTheme = useTheme()
  const i18n = i18nManager.getInstance()

  const renderDetailItem = (label, content) => {
    if (!content) return null
  
    const isLabelLong = label.length > 24
  
    return (
      <View style={[styles.detailItem, { flexDirection: isLabelLong ? 'column' : 'row' }]} key={label}>
        <Text style={[styles.detailLabel, { color: appTheme.text100 }]}>{label}:</Text>
        <Text style={[styles.detailContent, { color: appTheme.text200 }]}>{content}</Text>
      </View>
    )
  }

  const renderSection = (title, description, data) => (
    <View style={[styles.section, { backgroundColor: appTheme.bg200 }]} key={title}>
      <Text style={[styles.sectionTitle, { color: appTheme.text100 }]}>{title}</Text>
      <Text style={[styles.sectionDescription, { color: appTheme.text200 }]}>{description}</Text>
      {data.map(item => item.content !== null ? renderDetailItem(item.label, item.content) : null)}
    </View>
  )

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: appTheme.bg100 }]}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: launch.image }} resizeMode={isLargeScreen ? 'center' : 'cover'} />
        <Text style={[styles.launchTitle, { color: appTheme.text100 }]} numberOfLines={1} ellipsizeMode='tail'>
          {launch.name}
        </Text>
        <Text style={[styles.status, { color: appTheme.text200 }]}>{i18n.t('statusLabel')}: {launch.status?.name || i18n.t('unknownStatus')}</Text>

        <View style={styles.sectionsContainer}>
          {renderSection(i18n.t('missionDetails'), launch.mission?.description, [
            { label: i18n.t('orbit'), content: `(${launch.mission?.orbit?.abbrev}) ${launch.mission?.orbit?.name}` },
            { label: i18n.t('type'), content: launch.mission?.type },
            { label: i18n.t('weatherConcerns'), content: launch.weather_concerns }
          ])}
          {renderSection(i18n.t('rocketDetails'), launch.rocket?.configuration?.full_name, [
            { label: i18n.t('family'), content: launch.rocket?.configuration?.family },
            { label: i18n.t('variant'), content: launch.rocket?.configuration?.variant }
          ])}
          {renderSection(i18n.t('launchInfo'), i18n.t('launchInfoDetails'), [
            { label: i18n.t('launchPad'), content: launch.pad?.name },
            { label: i18n.t('windowStart'), content: formatDateToLocal(launch.window_start) },
            { label: i18n.t('windowEnd'), content: formatDateToLocal(launch.window_end) },
            { label: i18n.t('probability'), content: launch.probability ? `${launch.probability}%` : null }
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
    alignItems: 'left',
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
  }
})

export default LaunchDetail
