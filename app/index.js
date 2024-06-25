import { Redirect } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import i18nManager from '@/locales'
import { getLocales } from 'expo-localization'
import { updateLanguage } from '@/store/user'

export default function App() {
  const dispatch = useDispatch()

  const deviceLanguage = getLocales()[0].languageTag
  const storedLanguage =  useSelector(state => state.user.preferences.language) || deviceLanguage
  i18nManager.setLocale(storedLanguage)
  dispatch(updateLanguage(storedLanguage))

  return <Redirect href='/home' />
}
