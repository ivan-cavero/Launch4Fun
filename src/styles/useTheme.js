import { useColorScheme } from 'react-native';

export default function useTheme() {
  const colorScheme = useColorScheme();

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
      bg300: '#E9ECEF'
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
  };

  const currentColors = colors[colorScheme] || colors.dark;

  return currentColors;
}
