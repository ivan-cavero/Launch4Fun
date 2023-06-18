import React from 'react';
import { getUpcomingLaunches } from '../../services/launchService';
import LaunchList from './LaunchList';

const UpcomingLaunchList = () => {
  return <LaunchList loadData={getUpcomingLaunches} sortOrder="asc" />;
};

export default UpcomingLaunchList;
