import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const PlaceholderImage = ({width, height}) => {
  return (
    <View style={[styles.container, {width, height}]}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(PlaceholderImage);
