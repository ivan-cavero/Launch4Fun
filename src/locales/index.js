import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'

import en from '@/locales/en.json'
import es from '@/locales/es.json'
import de from '@/locales/de.json'
import fr from '@/locales/fr.json'
import ja from '@/locales/ja.json'
import pt from '@/locales/pt.json'
import it from '@/locales/it.json'

class I18nManager {
  constructor() {
    const deviceLanguage = getLocales()[0].languageTag
    this.i18nInstance = new I18n({
      'es-ES': es,
      'en-US': en,
      'de-DE': de,
      'fr-FR': fr,
      'ja-JP': ja,
      'pt-BR': pt,
      'it-IT': it
    })
    this.i18nInstance.locale = deviceLanguage
  }

  getInstance() {
    return this.i18nInstance
  }

  getLocale() {
    return this.i18nInstance.locale
  }

  setLocale(locale) {
    this.i18nInstance.locale = locale
  }
}

const i18nManager = new I18nManager()

export default i18nManager
