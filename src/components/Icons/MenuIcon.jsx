// src/components/Icons/MenuIcon.js
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const MenuIcon = (props) => {
  return (
    <Svg 
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill={props.color}
      {...props}
    >
    <Path
      d="M3 6h18c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1s.4 1 1 1zm18 5H3c-.6 0-1 .4-1 1s.4 1 1 1h18c.6 0 1-.4 1-1s-.4-1-1-1zm0 7H3c-.6 0-1 .4-1 1s.4 1 1 1h18c.6 0 1-.4 1-1s-.4-1-1-1z"
      fill="#FFFFFF"
    />
  </Svg>
  );
};

export default MenuIcon;