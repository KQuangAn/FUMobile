import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CustomViewContainer from '../../components/CustomViewContainer';
import RestaurantCard from '../../components/Restaurant/restaurantCard';
import {useLocationStore, useRestaurantStore} from '../../store/store';
import RestaurantHeader from '../../components/Restaurant/RestaurantHeader';
import {FIRESTORE} from '../../firebase/FirebaseConfig';
import {collection, onSnapshot, DocumentData} from 'firebase/firestore';
import {RestaurantProps} from '../../navigation/types';
import WelcomeScreen from '../WelcomeScreen';
import AppText from '../../components/AppText';
import { appWidth, appHeight } from '../../../utils/dimensions';


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'import type {AppStateStatus} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
const RestaurantScreen = () => {
  const [data, setData] = React.useState<RestaurantProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const setLocation = useLocationStore(state => state.setLocation);
  const restaurantDataStore = useRestaurantStore(state => state.restaurantData);

   const query = useQuery({ queryKey: ['restaurantData'], queryFn: getData })
    const queryClient = useQueryClient()

  // Request permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  // Fetch the user's current location
  const getCurrentLocation = async () => {
    try {
      if (await requestLocationPermission()) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation(latitude, longitude);
          },
          error => {
            console.error('Error getting current location:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const restaurantData = (
    docId: string,
    docData: DocumentData,
  ): RestaurantProps => {
    return {
      id: docId,
      title: docData.title,
      image: docData.image,
      description: docData.description,
      lat: docData.location.latitude,
      lng: docData.location.longitude,
      address: docData.address,
      numberOfReviews: docData.reviews.length,
      phone: docData.phone,
      rating: docData.rating,
      category: docData.category,
      active: docData.active,
      dishes: docData.dishes.map((dish: any) => ({
        id: dish.title,
        title: dish.title,
        description: dish.description,
        price: dish.price,
        image: dish.image,
        active: dish.active,
        optional: dish.optional,
      })),
      reviews: docData.reviews.map((review: any) => ({
        usersId: review.uId,
        images: review.images,
        reviewDate: review.reviewDate,
        rating: review.rating,
        reviewContent: review.reviewContent,
      })),
    };
  };

   

  //fetch restaurant data from firebase
  const getData = () => {

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      collection(FIRESTORE, 'restaurants'),
      querySnapshot => {
        const formattedData = querySnapshot.docs.map(doc =>
          restaurantData(doc.id, doc.data()),
        );
        console.log(formattedData);
        setData(formattedData); // Update the data whenever a change occurs
        restaurantDataStore(formattedData);
        setIsLoading(false);
      },
    );

    // Return an unsubscribe function to clean up the listener when component unmounts
    return unsubscribe;
  };

  useEffect(() => {
    try {
      const unsubscribe = getData(); // Start listening to changes
      getCurrentLocation();
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error('Error in restaurant screen', error);
      setIsLoading(false);
    }
  }, []);

  return (
    <CustomViewContainer mode="light">
      <WelcomeScreen isLoading={isLoading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <RestaurantHeader />
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>New finds for you</AppText>
          <FlatList
            removeClippedSubviews
            data={data}
            renderItem={({item}) => (
              <RestaurantCard
                cardHorizontal
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                category={item.category}
                address={item.address}
                phone={item.phone}
                description={item.description}
                dishes={item.dishes}
                reviews={item.reviews}
                lat={item.lat}
                lng={item.lng}
                offers={item.offers}
                active={item.active}
              />
            )}
            horizontal
            keyExtractor={item => {
              return item.id;
            }}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalFlatList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Best night cravings</AppText>
            <TouchableOpacity onPress={() => console.log('see all')}>
              <AppText style={styles.seeAllText}>See all</AppText>
            </TouchableOpacity>
          </View>
          <FlatList
            removeClippedSubviews
            data={data}
            renderItem={({item}) => (
              <RestaurantCard
                cardHorizontal
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                category={item.category}
                address={item.address}
                phone={item.phone}
                description={item.description}
                dishes={item.dishes}
                reviews={item.reviews}
                lat={item.lat}
                lng={item.lng}
                offers={item.offers}
                active={item.active}
              />
            )}
            horizontal
            keyExtractor={item => {
              return item.id;
            }}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalFlatList}
          />
        </View>
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>All Restaurants</AppText>
          {data.map(item => (
            <RestaurantCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              rating={item.rating}
              address={item.address}
              phone={item.phone}
              category={item.category}
              description={item.description}
              dishes={item.dishes}
              reviews={item.reviews}
              lat={item.lat}
              lng={item.lng}
              offers={item.offers}
              active={item.active}
            />
          ))}
        </View>
      </ScrollView>
    </CustomViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 5,
    marginHorizontal: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'opensans_regular',
  },
  seeAllText: {
    fontSize: 12,
    color: '#547C74',
  },
  horizontalFlatList: {
    flex: 1,
    height: appHeight(250),
  },
  lottie: {
    flex: 1,
  },
});

export default RestaurantScreen;
