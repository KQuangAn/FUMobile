import {Dimensions, Platform, StatusBar} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {isIOS} from './device';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * device screen size
 */
export const device = {
  width: windowWidth,
  height: windowHeight,
};

/**
 * design screen default iphone 11
 */
const DEFAULT_WIDTH = 414;
const DEFAULT_HEIGHT = 896;

/**
 * default height of notch and home indicator
 */
export const DEFAULT_NOTCH = 44;
export const DEFAULT_HOME = 34;

/**
 * check device is iphone X (has notch or dynamic island)
 * @returns
 */
export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 926 ||
      dimen.width === 926 ||
      dimen.height === 932 ||
      dimen.width === 932 ||
      dimen.height === 852 ||
      dimen.width === 852 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 667 ||
      dimen.width === 667 ||
      dimen.height === 812 ||
      dimen.width === 812)
  );
};

/**
 * style for iphone X
 * @param iphoneXStyle
 * @param regularStyle
 * @returns
 */
export const ifIphoneX = (iphoneXStyle: number, regularStyle: number) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

/**
 * status bar height for iphone x
 * @param safe
 * @returns
 */
export const getStatusBarHeight = (safe?: boolean) => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
};

/**
 * bottom space for iphone x
 * @returns
 */
export const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};

/**
 * responsive screen height
 * @param size
 * @returns
 */
export const appHeight = (size: number) => {
  const percentage = (size * 100) / DEFAULT_HEIGHT;
  return heightPercentageToDP(`${percentage}%`);
};

/**
 * responsive screen width
 * @param size
 * @returns
 */
export const appWidth = (size: number) => {
  const percentage = (size * 100) / DEFAULT_WIDTH;
  return widthPercentageToDP(`${percentage}%`);
};

/**
 * get top height without notch
 * @param size
 * @returns
 */
export const appTop = (size: number) => {
  if (isIOS) {
    return appHeight(size - DEFAULT_NOTCH + getStatusBarHeight());
  }

  return appHeight(size - DEFAULT_NOTCH);
};

/**
 * get bottom height without home indicator
 * @param size
 * @returns
 */
export const appBottom = (size: number) => {
  if (isIOS) {
    return appHeight(size - DEFAULT_HOME + getBottomSpace());
  }

  return appHeight(size - DEFAULT_HOME);
};
