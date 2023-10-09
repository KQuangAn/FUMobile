import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';

interface WelcomeScreenProps {
  isLoading: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({isLoading}) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    // Animate the loading animation for 5 seconds
    Animated.timing(animationProgress.current, {
      toValue: isLoading ? 1 : 0,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {isLoading && (
        <LottieView
          source={require('../assets/animation/animation.json')}
          autoPlay
          loop
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

export default WelcomeScreen;
