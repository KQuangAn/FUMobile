import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import {Icon} from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';

interface RentalCardProps {
  cardType: string;
  id: number;
  title: string;
  images: string[];
  description: string;
  address: string;
  contactNumber: string;
  contactName: string;
  policy: string;
  rooms: {
    price: number;
    size: number;
    maxOccupancy: number;
  }[];
  reviews: {rating: number}[];
}

const RentalCard: React.FC<RentalCardProps> = ({
  cardType,
  id,
  title,
  images,
  description,
  address,
  contactNumber,
  contactName,
  policy,
  rooms,
  reviews,
}) => {
  const navigation = useNavigation();

  const averageRating = reviews.reduce(
    (avg, item, _, {length}) => avg + item.rating / length,
    0,
  );

  const minMaxValues = rooms.reduce(
    (result, room) => {
      result.minPrice = Math.min(room.price, result.minPrice);
      result.maxPrice = Math.max(room.price, result.maxPrice);
      result.minSize = Math.min(room.size, result.minSize);
      result.maxSize = Math.max(room.size, result.maxSize);
      result.minMaxOccupancy = Math.min(
        room.maxOccupancy,
        result.minMaxOccupancy,
      );
      result.maxMaxOccupancy = Math.max(
        room.maxOccupancy,
        result.maxMaxOccupancy,
      );
      return result;
    },
    {
      minPrice: rooms[0].price,
      maxPrice: rooms[0].price,
      minSize: rooms[0].size,
      maxSize: rooms[0].size,
      minMaxOccupancy: rooms[0].maxOccupancy,
      maxMaxOccupancy: rooms[0].maxOccupancy,
    },
  );

  const minPrice = minMaxValues.minPrice;
  const maxPrice = minMaxValues.maxPrice;
  const minSize = minMaxValues.minSize;
  const maxSize = minMaxValues.maxSize;
  const minOccupancy = minMaxValues.minMaxOccupancy;
  const maxOccupancy = minMaxValues.maxMaxOccupancy;

  const maxPriceFormatted = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'VND',
  }).format(maxPrice);

  const minPriceFormatted = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'VND',
  }).format(minPrice);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.push('RentalScreen', {
          RentalData: {},
        });
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginBottom: 8,
          marginLeft: 5,
          marginRight: 5,
        }}>
        <View style={{width: '100%', height: 56}}>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              padding: 1,
              borderRadius: 20,
            }}
            source={{
              uri: 'https://cdn.luatvietnam.vn/uploaded/Images/Original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'space-y-2', marginTop: 8}}>
          <View>
            <Text
              numberOfLines={1}
              style={{fontSize: 12, fontWeight: 'bold', paddingTop: 2}}>
              {title} . {averageRating}
              <Icon name="star" width={20} height={14} fill="#FFD700" />
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontWeight: 'bold', fontSize: 16}}>
              {minPriceFormatted} - {maxPriceFormatted}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'gray'}}>
              {minSize}m2-{maxSize}m2 . {minOccupancy}-{maxOccupancy} người
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{color: 'gray', fontSize: 10}}>
              {address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RentalCard);
