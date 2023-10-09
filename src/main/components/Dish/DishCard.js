import React from 'react';
import {View, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {useBasketStore} from '../../store/store';
import AppText from '../AppText';

const DishCard = ({dish}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [pressed, setPressed] = React.useState(false);
  const addToBasket = useBasketStore(state => state.addToBasket);
  const updateBasketItem = useBasketStore(state => state.updateBasketItem);
  const removeFromBasket = useBasketStore(state => state.removeFromBasket);
  const navigation = useNavigation();

  //convert to vnd
  const price = dish.price.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  // when + button on dish card is press, add that item id and quantity to basket (temporarely)
  const handlePress = () => {
    addToBasket(dish, quantity);
    setPressed(!pressed);
  };

  const handleClose = () => {
    removeFromBasket(dish);
    setPressed(!pressed);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    quantity !== 1 ? setQuantity(quantity - 1) : handleClose();
  };

  React.useEffect(() => {
    //TODO show basket if any dish's quantity changed
    updateBasketItem(dish, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-1/2 h-56 p-2"
      onPress={() => {
        navigation.push('DishDetail', {
          dish,
        });
      }}>
      <View className=" bg-white">
        <View className="w-full h-2/3 ">
          <FastImage
            className="w-full h-full rounded-lg "
            source={{
              uri: dish.image[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          {pressed ? (
            <View
              className="
                absolute w-20 h-8 items-center m-2 right-0 bottom-0 rounded-full bg-white border
                ">
              <View className="flex-1 flex-row items-center justify-between w-full">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-1/3"
                  onPress={handleDecreaseQuantity}>
                  <AppText className="text-center  ">-</AppText>
                </TouchableOpacity>
                <AppText className="w-1/3 text-center">{quantity}</AppText>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-1/3"
                  onPress={handleIncreaseQuantity}>
                  <AppText className="text-center">+</AppText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              className="
            absolute right-0 bottom-0
            "
              onPress={() => handlePress()}>
              <View className="bg-green-500 rounded-full w-6 h-6 text-center justify-center items-center m-2">
                <AppText>+</AppText>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View className="px-3 pb-4 space-y-2">
          <AppText numberOfLines={1} className="text-lg ">
            {dish.title}
          </AppText>
          <View className="flex-row items-center space-x-1 font-bold ">
            <AppText className="font-bold text-md">{price} </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(DishCard);
