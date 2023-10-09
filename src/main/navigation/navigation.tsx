import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/auth/LoginScreen';
import SignUpScreen from '../pages/auth/SignUpScreen';
import DishUploadScreen from '../pages/DishUploadScreen';
import RestaurantScreen from '../pages/restaurant/RestaurantScreen';
import RestaurantDishes from '../pages/restaurant/RestaurantDishes';
import DishDetail from '../pages/restaurant/DishDetail';
import ChatScreen from '../pages/ChatScreen';
import RentalScreen from '../pages/rental/RentalScreen';
import BasketScreen from '../pages/BasketScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-eva-icons';
import LocationScreen from '../pages/LocationScreen';
import {useAuthStore} from '../store/store';
import ProfileScreen from '../pages/profile/ProfileScreen';
import FavoriteScreen from '../pages/profile/FavoriteScreen';
import {HomeStackParams} from './types';
import CreateRestaurant from '../pages/sellers/CreateRestaurant';
//import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type RootStackParams = {
  HomeStack: HomeStackParams; // Use the correct type
  RentalStack: undefined;
  BasketStack: undefined;
  ChatStack: undefined;
  ProfileStack: undefined;
};
const RootStack = createBottomTabNavigator<RootStackParams>();

const Home = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Home.Navigator
      initialRouteName="Restaurant"
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen name="Restaurant" component={RestaurantScreen} />
      <Home.Screen name="RestaurantDishes" component={RestaurantDishes} />
      <Home.Screen name="DishDetail" component={DishDetail} />
    </Home.Navigator>
  );
};

export type RentalStackParams = {
  Rental: undefined;
};

const Rental = createNativeStackNavigator<RentalStackParams>();

const RentalStack = () => {
  return (
    <Rental.Navigator
      initialRouteName="Rental"
      screenOptions={{
        headerShown: false,
      }}>
      <Rental.Screen name="Rental" component={RentalScreen} />
    </Rental.Navigator>
  );
};

export type ProfileStackParams = {
  Profile: undefined;
  Upload: {
    sellerId: string;
    dishId: string;
  };
  Favorite: undefined;
  Location: undefined;
  Basket: undefined;
  CreateRestaurant: undefined;
};

const Profile = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Profile.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="Upload" component={DishUploadScreen} />
      <Profile.Screen name="Favorite" component={FavoriteScreen} />
      <Profile.Screen name="Location" component={LocationScreen} />
      <Profile.Screen name="Basket" component={BasketScreen} />
      <Profile.Screen name="CreateRestaurant" component={CreateRestaurant} />
    </Profile.Navigator>
  );
};

export type AuthStackParams = {
  SignUp: undefined;
  Login: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="SignUp" component={SignUpScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  );
};

const HomeIcon = () => (
  <Icon name="shopping-cart-outline" width={20} height={20} />
);
const RentalIcon = () => <Icon name="home-outline" width={20} height={20} />;
const BasketIcon = () => (
  <Icon name="shopping-bag-outline" width={20} height={20} />
);
const ChatIcon = () => (
  <Icon name="message-circle-outline" width={20} height={20} />
);
const ProfileIcon = () => <Icon name="person-outline" width={20} height={20} />;

export default function Navigation() {
  const user = useAuthStore(state => state.user);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#e67a15',
          tabBarInactiveTintColor: 'gray',
        }}>
        <RootStack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: HomeIcon,
          }}
        />
        <RootStack.Screen
          name="RentalStack"
          component={RentalStack}
          options={{
            tabBarLabel: 'Rental',
            tabBarIcon: RentalIcon,
          }}
        />
        <RootStack.Screen
          name="BasketStack"
          component={user ? BasketScreen : AuthStack}
          options={{
            tabBarLabel: 'Basket',
            tabBarIcon: BasketIcon,
          }}
        />
        <RootStack.Screen
          name="ChatStack"
          component={user ? ChatScreen : AuthStack}
          options={{
            tabBarLabel: 'Chat', // You can change the label to your preference
            tabBarIcon: ChatIcon,
          }}
        />
        <RootStack.Screen
          name="ProfileStack"
          component={user ? ProfileStack : AuthStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ProfileIcon,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
