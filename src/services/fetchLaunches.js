import Constants from 'expo-constants'
import { api } from './api'
import translateText from '@/utils/translate'
import store from '@/store'

const { API_URL } = Constants.expoConfig.extra

const API_ENDPOINTS = {
  upcomingLaunches: `${API_URL}/launch/upcoming/`,
  pastLaunches: `${API_URL}/launch/previous/`
}

export const fetchUpcomingLaunches = async (limit = 10, offset = 0) => {
  const storedLanguage = store.getState().user.preferences.language

  const endpoint = `${API_ENDPOINTS.upcomingLaunches}?limit=${limit}&offset=${offset}`
  const data = await api(endpoint)

  if (storedLanguage !== 'en-US' && storedLanguage !== null) {
    const textsToTranslate = []

    for (const launch of data.results) {
      if (launch.mission?.description) {
        textsToTranslate.push(launch.mission.description)
      }
      if (launch.mission?.orbit?.name) {
        textsToTranslate.push(launch.mission.orbit.name)
      }
    }

    const translatedTexts = await translateText(textsToTranslate, storedLanguage)

    for (let i = 0; i < data.results.length; i++) {
      const launch = data.results[i];
      if (launch.mission?.description) {
        launch.mission.description = translatedTexts[i]
      }
      if (launch.mission?.orbit?.name) {
        launch.mission.orbit.name = translatedTexts[i + 1]
      }
    }
  }

  return data
}

export const fetchPastLaunches = async (limit = 10, offset = 0) => {
  const endpoint = `${API_ENDPOINTS.pastLaunches}?limit=${limit}&offset=${offset}`
  return await api(endpoint)
}