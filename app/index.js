import { Redirect } from 'expo-router'
import { useSelector } from 'react-redux'
import i18nManager from '@/locales'
import { getLocales } from 'expo-localization'

export default function App() {
  const deviceLanguage = getLocales()[0].languageTag
  const storedLanguage =  useSelector(state => state.user.preferences.language) || deviceLanguage
  i18nManager.setLocale(storedLanguage)

  return <Redirect href='/home' />
}
