import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-eva-icons';

interface HeartButtonProps {
  onPress: () => void;
  bgColor?: string;
  size: number;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  color?: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  onPress,
  bgColor,
  size,
  top,
  right,
  left,
  bottom,
  color,
}) => {
  const [isPressed, setPressed] = useState(false);
  const heartIconName = isPressed ? 'heart' : 'heart-outline';

  const buttonStyle = {
    position: 'absolute',
    top: top || undefined,
    right: right || undefined,
    left: left || undefined,
    bottom: bottom || undefined,
    justifyContent: 'center',
    alignItems: 'center',
    width: size + 10,
    height: size + 10,
    backgroundColor: bgColor,
    borderRadius: 9999,
  };

  const iconStyle = {
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        setPressed(!isPressed);
        onPress();
      }}
      style={[styles.buttonContainer, buttonStyle]}>
      <View style={[styles.iconContainer, iconStyle]}>
        <Icon
          name={heartIconName}
          width={size}
          height={size}
          fill={color || '#FFFFFF'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  iconContainer: {},
});

export default React.memo(HeartButton);
