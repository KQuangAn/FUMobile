import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';

interface ImageSliderProps {
  images: string[];
  onPress?: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({images, onPress}) => {
  return (
    <View style={styles.container}>
      <SliderBox
        ImageComponent={FastImage}
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={
          onPress ? (index: number) => onPress(index) : undefined
        }
        dotColor="white"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={styles.paginationBox}
        dotStyle={styles.dotStyle}
        ImageComponentStyle={styles.imageComponent}
        imageLoadingColor="#2196F3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationBox: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
  },
  imageComponent: {
    width: '100%',
  },
});

export default React.memo(ImageSlider);
