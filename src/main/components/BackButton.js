import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-eva-icons';

const BackButton = ({onPress}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    className="w-10 absolute top-5 left-5 ">
    <View className="bg-white rounded-full items-center justify-center ">
      <Icon name="arrow-back" width={18} height={40} fill="black" />
    </View>
  </TouchableOpacity>
);

export default React.memo(BackButton);
