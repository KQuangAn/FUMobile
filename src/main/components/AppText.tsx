import {Text, TextProps} from 'react-native';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../config/constant';
import {FONTS} from '../constants/constant';

interface Props extends TextProps {
  children: string | any;
}

const AppText = (props: Props) => {
  const {children} = props;

  return (
    <Text style={styles.defaultText} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    font: FONTS.MONTSERRAT_BLACK,
    color: COLORS.BLACK,
  },
});

export default memo(AppText);
