import { View, Text, Image, StyleSheet, Platform, Dimensions, Pressable } from 'react-native'
import useTheme from '@/styles/useTheme'
import { formatDateToLocal } from '@/utils/dateUtils'
import { router } from 'expo-router'
import { useCountdown } from '@/hooks/useCountdown'
import { getStatusBackgroundColor, getStatusText } from '@/utils/statusUtil'
import { setSelectedLaunch } from '@/store/selectedLaunch'
import { useDispatch } from 'react-redux'

export default function LaunchListItem({ launch }) {
  const appTheme = useTheme()
  const dispatch = useDispatch()

  const formattedDate = formatDateToLocal(launch.net)
  const statusBackgroundColor = getStatusBackgroundColor(launch.status?.name)
  const statusText = getStatusText(launch.status?.name)
  const countdown = useCountdown(launch.net)

  const handlePress = () => {
    dispatch(setSelectedLaunch(launch))
    router.push({ pathname: `launch/${launch.id}`, params: { name: launch.name } })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.itemContainer, { backgroundColor: appTheme.bg200 }]}>
        <View style={styles.infoContainer}>
          <Text style={[styles.itemName, { color: appTheme.text100 }]} numberOfLines={1}>
            {launch.name}
          </Text>
          <View style={styles.dateAndCountdown}>
            <Text style={[styles.itemNet, { color: appTheme.primary100 }]}>{formattedDate}</Text>
            <View style={[styles.launchStatus, { backgroundColor: statusBackgroundColor }]}>
              <Text style={styles.launchStatusText}>{statusText}</Text>
            </View>
          </View>
          <Text style={[styles.countdown, { color: appTheme.text200 }]}>{countdown}</Text>
        </View>
        <Image source={{ uri: launch.image }} style={styles.itemImage} />
      </View>
    </Pressable>
  )
}

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
    marginBottom: 5
  },
  itemNet: {
    fontSize: 12
  },
  dateAndCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  countdown: {
    fontSize: 10
  },
  launchStatus: {
    marginLeft: 10,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 7
  },
  launchStatusText: {
    fontSize: 8,
    color: '#212529'
  },
  itemImage: {
    width: 80,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
})