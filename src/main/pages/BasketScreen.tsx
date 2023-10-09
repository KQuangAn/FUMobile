/*
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useBasketStore} from '../store/store';
import {Icon} from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';

const BasketScreen = () => {
  const basket = useBasketStore(state => state.basket);
  const total = useBasketStore(state => state.total);
  const removeFromBasket = useBasketStore(state => state.removeFromBasket);
  const updateBasketItem = useBasketStore(state => state.updateBasketItem);

  const increaseQuantity = (dish, quantity) => {
    updateBasketItem(dish, quantity + 1);
  };

  const decreaseQuantity = (dish, quantity) => {
    if (quantity > 1) {
      updateBasketItem(dish, quantity - 1);
    }
  };

  const renderItem = ({item}) => (
    <View className="flex flex-row justify-between items-center p-4 border-b border-gray-300">
      <FastImage
        className="w-1/3 h-full"
        source={{
          uri: item.dish.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View className="flex flex-col w-1/4">
        <Text className="text-base ">{item.dish.title}</Text>
        <View className="flex-1 flex-row items-center justify-between w-full">
          <TouchableOpacity
            className="w-1/3"
            onPress={() => decreaseQuantity(item.dish, item.quantity)}>
            <Text className="text-center  ">-</Text>
          </TouchableOpacity>
          <Text className="w-1/3 text-center">{item.quantity}</Text>
          <TouchableOpacity
            className="w-1/3"
            onPress={() => increaseQuantity(item.dish, item.quantity)}>
            <Text className="text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-base">${item.dish.price * item.quantity}</Text>
      <TouchableOpacity
        className="text-base text-red-600"
        onPress={() => removeFromBasket(item.dish)}>
        <Icon className="h-6 w-4" name="trash-2-outline" fill="#7cd925" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Basket</Text>
      <FlatList
        data={basket}
        renderItem={renderItem}
        keyExtractor={item => item.dish.id.toString()}
      />
      <View className="flex flex-row justify-between items-center p-4 mt-4 bg-gray-100">
        <Text className="font-bold">Total:</Text>
        <Text className="font-bold">${total}</Text>
      </View>
    </View>
  );
};

export default BasketScreen;
*/

import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useBasketStore} from '../store/store';
import {Icon} from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';

const BasketScreen: React.FC = () => {
  const basket = useBasketStore(state => state.basket);
  const total = useBasketStore(state => state.total);
  const removeFromBasket = useBasketStore(state => state.removeFromBasket);
  const updateBasketItem = useBasketStore(state => state.updateBasketItem);

  const increaseQuantity = (dish: any, quantity: number) => {
    updateBasketItem(dish, quantity + 1);
  };

  const decreaseQuantity = (dish: any, quantity: number) => {
    if (quantity > 1) {
      updateBasketItem(dish, quantity - 1);
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.itemContainer}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.dish.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.dish.title}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.dish, item.quantity)}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.dish, item.quantity)}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.price}>${item.dish.price * item.quantity}</Text>
      <TouchableOpacity onPress={() => removeFromBasket(item.dish)}>
        <Icon name="trash-2-outline" fill="#7cd925" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basket</Text>
      <FlatList
        data={basket}
        renderItem={renderItem}
        keyExtractor={item => item.dish.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.boldText}>Total:</Text>
        <Text style={styles.boldText}>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  image: {
    width: '33%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '25%',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  quantityButton: {
    width: '30%',
  },
  quantityText: {
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    backgroundColor: 'gray',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default BasketScreen;
