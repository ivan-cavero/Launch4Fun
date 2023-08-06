import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

const API_URL = isDevelopment
  ? 'https://lldev.thespacedevs.com/2.2.0/launch/'
  : 'https://ll.thespacedevs.com/2.2.0/launch/';

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
