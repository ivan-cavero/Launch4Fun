import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const FavoritesView = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <View>
      <Text>Current favorites: </Text>
        {favorites.map((favorite) => (
            <Text key={favorite.id}>{favorite.name}</Text>
        ))}
    </View>
  );
};

export default FavoritesView;
