import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useAuthStore} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../firebase/FirebaseConfig';
import {Icon} from 'react-native-eva-icons';
import ProfileButton from '../../components/ProfileButton';
import FastImage from 'react-native-fast-image';

function ProfileScreen() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const userInfo = useAuthStore(state => state.userInfo);

  const navigation = useNavigation();

  const handleOpenProfile = () => {
    // Navigate to the pf screen
  };

  const handleOpenBasket = () => {
    navigation.navigate('Basket');
  };

  const handleOpenFavorites = () => {
    // Navigate to the favorites screen
    // navigation.navigate('FavoritesStack');
  };

  const handleOpenRestaurant = () => {
    navigation.navigate('CreateRestaurant');
  };

  const handleSetLocation = () => {
    navigation.navigate('Location');
  };

  const handleCard = () => {
    //card
  };

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await signOut(FIREBASE_AUTH);
      // Clear user data from Zustand store
      logout();
      console.log(user);
      // Navigate to the login screen
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white border-b-2 border-gray-200">
        <TouchableOpacity
          className="flex flex-row p-5 justify-between items-center "
          onPress={handleOpenProfile}>
          <View className="flex flex-row items-center gap-x-2">
            <FastImage
              className="w-10 h-10 rounded-full"
              source={{
                uri: user?.photoURL,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text>{user?.displayName}</Text>
          </View>
          <Icon
            className="items-center"
            name="arrow-ios-forward-outline"
            width={15}
            height={20}
          />
        </TouchableOpacity>
        <ProfileButton
          title="Giỏ Hàng"
          iconName="shopping-bag-outline"
          callback={handleOpenBasket}
        />
        <ProfileButton
          title="Yêu Thích"
          iconName="heart-outline"
          callback={handleOpenFavorites}
        />
        <ProfileButton
          title="Quản lý thanh toán"
          iconName="credit-card-outline"
          callback={handleCard}
        />
        <ProfileButton
          title="Vị trí"
          iconName="pin-outline"
          callback={handleSetLocation}
        />
        {userInfo.role === 'seller' ? (
          <ProfileButton
            title="Quản lý nhà hàng "
            iconName="activity-outline"
            callback={handleOpenRestaurant}
          />
        ) : null}

        <ProfileButton
          title="Đăng xuất"
          iconName="log-out-outline"
          callback={handleSignOut}
        />
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
