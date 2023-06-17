// src/components/Icons/HistoryIcon.js
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const HistoryIcon = (props) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill={props.color}
      {...props}
    >
      <Path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6h6v-2h-4V7z" />
    </Svg>
  );
};

export default HistoryIcon;