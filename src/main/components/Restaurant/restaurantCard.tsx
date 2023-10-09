import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-eva-icons';
import {getDistance} from 'geolib';
import {useLocationStore} from '../../store/store';
import PlaceholderImage from '../PlaceholderImage';
import FastImage from 'react-native-fast-image';
import HeartButton from '../HeartButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/types';
import type {RestaurantProps} from '../../navigation/types';
import AppText from '../AppText';
import {appHeight, appWidth} from '../../../utils/dimensions';
interface RestaurantCardProps extends RestaurantProps {
  cardHorizontal?: boolean;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({
  cardHorizontal,
  id,
  title,
  image,
  rating,
  category,
  address,
  phone,
  description,
  dishes,
  reviews,
  numberOfReviews,
  lat,
  lng,
  active,
}: RestaurantCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {latitude, longitude} = useLocationStore();

  //const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const imageWidth = cardHorizontal ? 300 : 200;
  const imageHeight = cardHorizontal ? 200 : 150;

  const restaurantLocations = {latitude: lat, longitude: lng};
  const myLocation = {latitude, longitude};
  let distance: number | undefined = undefined;

  if (myLocation.latitude != null && myLocation.longitude != null) {
    distance = Math.ceil(getDistance(myLocation, restaurantLocations) / 1000);
  } else {
    console.log('Either myLocation is null or undefined');
  }

  const onFavoritePress = () => {
    console.log('add to favorites');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.cardContainer]}
      onPress={() => {
        navigation.push('RestaurantDishes', {
          restaurantData: {
            id,
            title,
            image,
            category,
            address,
            phone,
            description,
            dishes,
            reviews,
            lat,
            lng,
            rating,
            numberOfReviews,
            active,
          },
          distance,
        });
      }}
      disabled={!active}>
      {image ? (
        cardHorizontal ? (
          <View
            style={[
              styles.cardHorizontalContainer,
              active ? undefined : styles.closed,
            ]}>
            <FastImage
              style={styles.image}
              source={{
                uri: image[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.cardContentContainer}>
              <View style={styles.titleContainer}>
                <AppText numberOfLines={1} style={styles.textTitle}>
                  {title} {active ? null : '(đã đóng cửa)'}
                </AppText>
                <View style={styles.ratingContainer}>
                  <AppText style={styles.textTitle}>{rating}</AppText>
                  <Icon style={styles.icon} name="star" fill="#B5D884" />
                </View>
              </View>
              <View style={styles.subtitleContainer}>
                <AppText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textSubtitle}>
                  $$ ~{distance} km
                </AppText>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.cardVerticalContainer,
              active ? undefined : styles.closed,
            ]}>
            <FastImage
              style={styles.image}
              source={{
                uri: image[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <HeartButton
              size={30}
              onPress={onFavoritePress}
              top={5}
              right={5}
            />
            <View style={styles.cardContentContainer}>
              <View style={styles.titleContainer}>
                <AppText numberOfLines={1} style={styles.textTitle}>
                  {title} {active ? null : '(đã đóng cửa)'}
                </AppText>
                <View style={styles.ratingContainer}>
                  <AppText style={styles.textTitle}>{rating}</AppText>
                  <Icon style={styles.icon} name="star" fill="#B5D884" />
                </View>
              </View>
              <View style={styles.subtitleContainer}>
                <Icon name="pin" style={styles.icon} fill="#466148" />
                <AppText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textSubtitle}>
                  ~{distance} km
                </AppText>
              </View>
            </View>
          </View>
        )
      ) : (
        // Render the PlaceholderImage component while waiting for image
        <PlaceholderImage width={imageWidth} height={imageHeight} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 8,
  },
  cardHorizontalContainer: {
    flex: 1,
    width: appWidth(250),
    marginRight: appWidth(20),
    marginVertical: appHeight(10),
    backgroundColor: 'white',
    borderRadius: 6,
  },
  cardContentContainer: {
    flex: 1,
  },

  cardVerticalContainer: {
    flex: 1,
    height: appHeight(250),
    marginVertical: appHeight(5),
    backgroundColor: 'white',
    borderRadius: 6,
  },
  image: {
    flex: 3,
    borderRadius: 6,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: appWidth(8),
  },
  ratingContainer: {
    width: appWidth(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: appWidth(14),
  },
  textSubtitle: {
    fontSize: appWidth(14),
  },
  icon: {
    flex: 0.2,
    width: 12,
    height: appHeight(14),
  },
  closed: {
    opacity: 0.25,
  },
});

export default React.memo(RestaurantCard);
