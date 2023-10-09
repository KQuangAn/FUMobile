import {View, ScrollView, Text, TouchableOpacity, Animated} from 'react-native';
import DishCard from '../../components/Dish/DishCard';
import React from 'react';
import {useBasketStore} from '../../store/store';
import {Icon} from 'react-native-eva-icons';
import BackButton from '../../components/BackButton';
import HeartButton from '../../components/HeartButton';
import PlaceholderImage from '../../components/PlaceholderImage';
import FastImage from 'react-native-fast-image';
import {HomeStackParams} from '../../navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParams, 'RestaurantDishes'>;

export default function RestaurantDishes({route, navigation}: Props) {
  const RestaurantData = route.params.restaurantData;
  const distance = route.params.distance;
  const basketState = useBasketStore(state => ({
    basket: state.basket,
    total: state.total,
    addToBasket: state.addToBasket,
  }));

  const handleAddToBasket = () => {};

  // blur image as user scroll
  const scrollY = new Animated.Value(0);
  const INITIAL_OPACITY = 1;
  const backgroundImageStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [INITIAL_OPACITY, 0.8],
      extrapolate: 'clamp',
    }),
  };

  console.log(RestaurantData.reviews);

  return (
    <View className="flex-1">
      <TouchableOpacity className="w-full absolute inset-x-0 top-0  z-0">
        <Animated.View style={[backgroundImageStyle]}>
          {RestaurantData.image ? (
            <FastImage
              className="w-full h-64"
              source={{
                uri: RestaurantData.image[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              testID="restaurant-image"
            />
          ) : (
            <PlaceholderImage width={100} height={100} />
          )}
        </Animated.View>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <BackButton onPress={() => navigation.goBack()} />
        <HeartButton
          size={30}
          bgColor="white"
          onPress={() => console.log('add to fav')}
          top={20}
          right={20}
          color="pink"
        />

        <View
          className="
                  flex flex-col
                  mt-56
                  justify-center
                  bg-white
                  z-10
                  rounded-xl
                  px-5
                  py-3
                  ">
          {/* restaurant info */}

          {/* title */}
          <View>
            <Text numberOfLines={1} className="text-3xl font-bold">
              {RestaurantData.title}
            </Text>
          </View>

          {/* restaurant category*/}
          <View className="flex flex-row items-center py-2">
            <Text className="text-orange-300 font-bold">
              {RestaurantData.category}
            </Text>
          </View>

          {/* restaurant rating */}
          <View className="flex flex-row items-center justify-between py-2">
            <View className="flex flex-row items-center">
              <Text className=" font-bold">$ - {distance} km</Text>
            </View>
            <View className="flex flex-row items-center">
              <Text className=" font-bold">{RestaurantData.rating}</Text>
              <Icon name="star" width={20} height={20} fill="#466148" />
            </View>
          </View>

          {/* restaurant infor */}
          <View className="flex flex-col p-4 gap-3">
            <View className="flex flex-row items-center ">
              <Icon name="pin-outline" width={20} height={20} fill="#466148" />
              <Text className="ml-2 text-lg">{RestaurantData.address}</Text>
            </View>

            {/* serve time  */}
            <View className="flex flex-row items-center ">
              <Icon
                name="clock-outline"
                width={20}
                height={20}
                fill="#466148"
              />
              <Text className="ml-2 text-lg">Open Mon-Fri,Until 10pm</Text>
            </View>
            {/* phone number  */}
            <View className="flex flex-row items-center">
              <Icon
                name="phone-outline"
                width={20}
                height={20}
                fill="#466148"
              />
              <Text className="ml-2 text-lg">{RestaurantData.phone}</Text>
            </View>
            {/* offers */}
            <View className="flex flex-row items-center ">
              <Icon
                name="pricetags-outline"
                width={20}
                height={20}
                fill="#466148"
              />
              <Text className="ml-2 text-lg">
                {/* {RestaurantData.offers} */}
                100d off your first purchase!
              </Text>
            </View>
          </View>
          <View>
            {/* dishes */}
            <Text className="text-lg">Menu</Text>
            <View className=" flex flex-row flex-wrap justify-between">
              {RestaurantData.dishes.map(item => (
                <DishCard key={item.id} dish={item} />
              ))}
            </View>
          </View>
          <View>
            {/* Reviews */}
            <Text className="font-bold text-xl">Reviews </Text>
            <View className=" flex flex-row flex-wrap justify-between">
              {RestaurantData.reviews.map(item => (
                <View>
                  <View className="flex flex-row items-center gap-x-2">
                    {/* <FastImage
                      className="w-10 h-10 rounded-full"
                      source={{
                        uri: item?.photoURL,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text>{item?.displayName}</Text> */}
                  </View>
                  <Text>{item.rating}</Text>
                  <Text>{item.reviewContent}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/*//////////////// Add to cart absolute button ////////////////////*/}
      <View className="absolute bottom-0 w-full justify-center items-center p-5 z-50">
        {basketState.basket.length ? (
          <TouchableOpacity
            className="flex flex-row  p-1 justify-center w-full bg-green-500 rounded-xl text-center items-center"
            onPress={handleAddToBasket}>
            <Text className="text-white text-xl ">Giỏ hàng</Text>
            <Text className="ml-2 text-white text-xl ">
              {basketState.total}đ
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
