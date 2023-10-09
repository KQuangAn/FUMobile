import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useAuthStore} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// Sample restaurant data for demonstration
const restaurantData = [
  {
    id: '1',
    name: 'Restaurant A',
    image: 'https://example.com/restaurant-a.jpg',
  },
  {
    id: '2',
    name: 'Restaurant B',
    image: 'https://example.com/restaurant-b.jpg',
  },
  // Add more restaurants here
];

function FavoriteScreen() {
  const user = useAuthStore(state => state.user);
  const navigation = useNavigation();

  const handleRestaurantPress = restaurant => {
    // Navigate to the restaurant details screen
    // navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={user.favorites} // Assuming user.favorites is an array of restaurant IDs
        keyExtractor={item => item}
        renderItem={({item}) => {
          const restaurant = restaurantData.find(r => r.id === item);
          if (!restaurant) return null;
          return (
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => handleRestaurantPress(restaurant)}>
              <FastImage
                style={{width: 100, height: 100, borderRadius: 8}}
                source={{
                  uri: restaurant.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text>{restaurant.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default FavoriteScreen;
