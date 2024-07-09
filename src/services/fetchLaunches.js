import Constants from 'expo-constants'
import { api } from './api'
import translateText from '@/utils/translate'
import store from '@/store'
import { formatDateToLocal } from '@/utils/dateUtils'
import { format, subHours } from 'date-fns';

const { API_URL } = Constants.expoConfig.extra

const API_ENDPOINTS = {
  upcomingLaunches: `${API_URL}/launch/upcoming/`,
  pastLaunches: `${API_URL}/launch/previous/`
}

export const fetchUpcomingLaunches = async (limit = 10, offset = 0) => {
  const storedLanguage = store.getState().user.preferences.language
  const storedAutoTranslate = store.getState().user.preferences.autoTranslate

  const currentDate = formatDateToLocal(subHours(new Date(), 12), 'yyyy-MM-dd HH:mm')
  const endpoint = `${API_ENDPOINTS.upcomingLaunches}?limit=${limit}&offset=${offset}&net__gte=${currentDate}`;
  let data = await api(endpoint)

  if (storedLanguage !== 'en-US' && storedLanguage !== null && storedAutoTranslate) {
    const textsToTranslate = []

    for (const launch of data.results) {
      if (launch.mission?.description) {
        textsToTranslate.push(launch.mission.description)
      }
      if (launch.mission?.orbit?.name) {
        textsToTranslate.push(launch.mission.orbit.name)
      }
      if (launch.mission?.type) {
        textsToTranslate.push(launch.mission.type)
      }
    }

    const translationStartTime = new Date()

    const translationResults = await translateText(textsToTranslate, storedLanguage)

    const translationEndTime = new Date()
    const translationTime = translationEndTime - translationStartTime

    let translationIndex = 0
    for (const launch of data.results) {
      if (launch.mission?.description) {
        launch.mission.description = translationResults[translationIndex++]
      }
      if (launch.mission?.orbit?.name) {
        launch.mission.orbit.name = translationResults[translationIndex++]
      }
      if (launch.mission?.type) {
        launch.mission.type = translationResults[translationIndex++]
      }
    }

    // Add translation status to the data object
    const translationStatus = {
      translated: true,
      fromLanguage: 'en-US',
      toLanguage: storedLanguage,
      translationTime: translationTime / 1000
    }
    data.translationStatus = translationStatus
  } else {
    // If auto-translate is disabled or the language is English, set translationStatus accordingly
    data.translationStatus = {
      translated: false
    }
  }

  return data
}

export const fetchPastLaunches = async (limit = 10, offset = 0) => {
  const endpoint = `${API_ENDPOINTS.pastLaunches}?limit=${limit}&offset=${offset}`
  return await api(endpoint)
}