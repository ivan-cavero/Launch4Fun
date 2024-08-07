import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'

export default function useTheme() {
  const colorScheme = useColorScheme()
  const userTheme = useSelector(state => state.user.preferences.theme)

  const colors = {
    light: {
      primary100: '#007BFF',
      primary200: '#4DA1FF',
      primary300: '#B3D4FF',
      accent100: '#28A745',
      accent200: '#A8E0A5',
      text100: '#212529',
      text200: '#6C757D',
      bg100: '#FFFFFF',
      bg200: '#F8F9FA',
      bg300: '#E9ECEF',
      mode: 'light'
    },
    dark: {
      primary100: '#0d6efd',
      primary200: '#6c757d',
      primary300: '#adb5bd',
      accent100: '#0d6efd',
      accent200: '#adb5bd',
      text100: '#ffffff',
      text200: '#adb5bd',
      bg100: '#121212',
      bg200: '#1e1e1e',
      bg300: '#2d2d2d',
      mode: 'dark'
    }
  }

  let currentColors;
  if (userTheme === 'auto') {
    currentColors = colors[colorScheme] || colors.dark
  } else {
    currentColors = colors[userTheme] || colors.dark
  }

  return currentColors
}
