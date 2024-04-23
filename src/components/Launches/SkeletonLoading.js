import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'

const AnimatedView = Animated.createAnimatedComponent(View)

export default function SkeletonLoading({ blockCount = 3, imageWidth = 120, blockHeight = 27 }) {
  const animatedValue = new Animated.Value(0)

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false
      })
    ])
  ).start()

  const gradientColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1b1b1b', '#3A3A3A']
  })

  const blocks = Array.from({ length: blockCount }, (_, index) => (
    <AnimatedView key={index} style={[styles.skeletonBlock, { backgroundColor: gradientColor, marginBottom: 5, height: blockHeight }]} />
  ))

  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonInfo}>{blocks}</View>
      <AnimatedView style={[styles.skeletonImage, { backgroundColor: gradientColor, width: imageWidth }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#1b1b1b'
  },
  skeletonInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 5
  },
  skeletonBlock: {
    borderRadius: 4,
    width: '80%'
  },
  skeletonImage: {
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
})
