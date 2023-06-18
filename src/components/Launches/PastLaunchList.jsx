import React from 'react';
import { getPastLaunches } from '../../services/launchService';
import LaunchList from './LaunchList';

const PastLaunchList = () => {
  return <LaunchList loadData={getPastLaunches} sortOrder="desc" />;
};

export default PastLaunchList;
