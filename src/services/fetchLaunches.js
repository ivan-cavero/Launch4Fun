import Constants from 'expo-constants'
import { api } from './api';

const { API_URL } = Constants.expoConfig.extra

const API_ENDPOINTS = {
  upcomingLaunches: `${API_URL}/launch/upcoming/`,
  pastLaunches: `${API_URL}/launch/previous/`
}

export const fetchUpcomingLaunches = async (limit = 10, offset = 0) => {
  const endpoint = `${API_ENDPOINTS.upcomingLaunches}?limit=${limit}&offset=${offset}`
  return await api(endpoint)
}

export const fetchPastLaunches = async (limit = 10, offset = 0) => {
  const endpoint = `${API_ENDPOINTS.pastLaunches}?limit=${limit}&offset=${offset}`
  return await api(endpoint)
}