import { Redirect } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import i18nManager from '@/locales'
import { getLocales } from 'expo-localization'
import { updateLanguage } from '@/store/user'

export default function App() {
  const dispatch = useDispatch()

  const storedLanguage =  useSelector(state => state.user.preferences.language) || getLocales()[0].languageTag
  i18nManager.setLocale(storedLanguage)
  dispatch(updateLanguage(storedLanguage))

  return <Redirect href='/home' />
}
