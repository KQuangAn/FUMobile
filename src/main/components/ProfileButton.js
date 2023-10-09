import {Icon} from 'react-native-eva-icons';
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ProfileButton = ({title, iconName, callback}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex flex-row p-2 my-1 gap-x-2 border-b-2 border-gray-200/50"
      onPress={callback}>
      <Icon name={iconName} width={20} height={30} />
      <Text className="text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ProfileButton);
