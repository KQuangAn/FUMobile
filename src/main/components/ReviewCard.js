import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import {Icon} from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';
import AppText from './AppText';
import {appWidth, appHeight} from '../utils/dimensions';

function ReviewCard({reviews}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // Go to review
      }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: 'https://lienhehotro.vn//uploads/20220812/so-dien-thoai-kfc-hai-duong.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.starContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              review title
            </AppText>
            <View style={styles.starIcon}>
              <Icon name="star" fill="#7cd925" />
            </View>
          </View>
          <View>
            <AppText style={styles.reviewText}>
              <AppText style={styles.reviewText}> ({reviews} review)</AppText> ·{' '}
            </AppText>
          </View>
          <View style={styles.reviewDesc}>
            <Icon name="star" style={styles.starIcon} />
            <AppText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.reviewText}>
              review desc
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ReviewCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: appHeight(20), // You can adjust the height as needed
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10, // Rounded corners
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: appWidth(100),
    height: appHeight(100),
    padding: 1,
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensure the image is within the bounds of its container
  },
  infoContainer: {
    flex: 2,
    padding: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  starContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  reviewText: {
    color: 'gray',
    fontSize: 12,
  },
  reviewDesc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
