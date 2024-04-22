import { useColorScheme } from 'react-native';

export default function useTheme() {
  const colorScheme = useColorScheme();

  const colors = {
    light: {
      primary100: '#0085ff',
      primary200: '#69b4ff',
      primary300: '#e0ffff',
      accent100: '#006fff',
      accent200: '#e1ffff',
      text100: '#FFFFFF',
      text200: '#9e9e9e',
      bg100: '#1E1E1E',
      bg200: '#2d2d2d',
      bg300: '#454545'
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
      bg300: '#2d2d2d'
    }
  }

  const currentColors = colors[colorScheme] || colors.dark;

  return currentColors
}
