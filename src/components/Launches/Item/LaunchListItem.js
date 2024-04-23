import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native'
import useTheme from '@/styles/useTheme'

export default function LaunchListItem({ launch }) {
  const appTheme = useTheme()
  const windowWidth = Dimensions.get('window').width
  const isDesktop = Platform.OS === 'web'
  const gridSize = isDesktop ? windowWidth / 4 - 20 : ''

  const styles = StyleSheet.create({
    itemContainer: {
      width: gridSize,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 8,
      backgroundColor: appTheme.bg200,
      ...Platform.select({
        android: {
          elevation: 2
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1
        }
      })
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 15
    },
    itemName: {
      fontSize: 14,
      color: appTheme.text100,
      marginBottom: 5
    },
    itemNet: {
      fontSize: 12,
      color: appTheme.primary100
    },
    dateAndCountdown: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5
    },
    countdown: {
      fontSize: 10,
      color: appTheme.text200
    },
    launchStatus: {
      marginLeft: 10,
      paddingVertical: 1,
      paddingHorizontal: 4,
      borderRadius: 7,
      backgroundColor: appTheme.accent100
    },
    launchStatusText: {
      fontSize: 8,
      color: appTheme.text100
    },
    itemImage: {
      width: 80,
      height: '100%',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10
    }
  })

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {launch.name}
        </Text>
        <View style={styles.dateAndCountdown}>
          <Text style={styles.itemNet}>20/10/2022</Text>
          <View style={styles.launchStatus}>
            <Text style={styles.launchStatusText}>TBD</Text>
          </View>
        </View>
        <Text style={styles.countdown}>in 4d</Text>
      </View>
      <Image source={{ uri: launch.image }} style={styles.itemImage} />
    </View>
  )
}
