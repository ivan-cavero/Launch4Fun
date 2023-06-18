import axios from 'axios';
import appConfig from '../../app.json';

export const checkForNewVersion = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/ivan-cavero/Launch4Fun/releases/latest');
    const data = response.data;

    const latestVersion = data.tag_name;
    const currentVersion = appConfig.expo.version;

    return latestVersion !== currentVersion;
  } catch (error) {
    console.error('Error checking for new version:', error);
    return false;
  }
};
