// src/services/launchService.js
import axios from 'axios';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/launch/';

export const getUpcomingLaunches = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        limit,
        offset,
        net__gte: new Date().toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching launches:', error);
    throw error;
  }
};

export const getPastLaunches = async (offset = 0, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        limit,
        offset,
        net__lt: new Date().toISOString(),
        ordering: '-net',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching launches:', error);
    throw error;
  }
};
