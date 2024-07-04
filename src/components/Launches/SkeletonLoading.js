import useTheme from '@/styles/useTheme'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

const AnimatedView = Animated.createAnimatedComponent(View)

export default function SkeletonLoading({ blockCount = 3, imageWidth = 120, blockHeight = 27 }) {
  const appTheme = useTheme()

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
    outputRange: [
      appTheme.mode === 'light' ? appTheme.bg200 : '#1b1b1b',
      appTheme.mode === 'light' ? appTheme.bg300 : '#3A3A3A'
    ]
  })

  const backgroundColor = appTheme.mode === 'light' ? '#f5f5f5' : '#1b1b1b'

  const blocks = Array.from({ length: blockCount }, (_, index) => (
    <AnimatedView 
      key={index} 
      style={[styles.skeletonBlock, { backgroundColor: gradientColor, marginBottom: 5, height: blockHeight }]} 
      accessibilityLabel={`Loading placeholder block ${index + 1}`}
    />
  ))

  return (
    <View style={[styles.skeletonContainer, { backgroundColor: backgroundColor }]}>
      <View style={styles.skeletonInfo} accessibilityLabel="Loading placeholder information">
        {blocks}
      </View>
      <AnimatedView 
        style={[styles.skeletonImage, { backgroundColor: gradientColor, width: imageWidth }]} 
        accessibilityLabel="Loading placeholder image"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 5
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
