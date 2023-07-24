import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ConfigurationPage = () => {
  const theme = useSelector((state) => state.configuration.theme);

  return (
    <View>
      <Text>Current Theme: {theme}</Text>
    </View>
  );
};

export default ConfigurationPage;
