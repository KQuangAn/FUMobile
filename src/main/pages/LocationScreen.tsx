import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore, useLocationStore} from '../store/store';
import {Config} from 'react-native-config';
import {FIRESTORE} from '../firebase/FirebaseConfig';
import {doc, setDoc} from 'firebase/firestore';
import SearchComponent from '../components/SearchComponent';

const LocationScreen: React.FC = () => {
  //const googleMapsApiKey = Config.GOOGLE_MAPS_API_KEY;
  const HereApiKey = Config.HERE_API_KEY;
  const mapRef = React.useRef<MapView>(null); // Create a reference to the MapView component

  const [loading, setLoading] = React.useState(true); // Add loading state

  const [initialRegion, setInitialRegion] = React.useState<Region | undefined>(
    undefined,
  );

  //pin location
  const [selectedLocation, setSelectedLocation] = React.useState<
    LatLng | undefined
  >(undefined);

  //import zustand stores
  const setLocation = useLocationStore(state => state.setLocation);
  const user = useAuthStore(state => state.user);
  const uid = user.uid;

  React.useEffect(() => {
    // Get the user's current location using geolocation
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(position.coords);
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.00122,
          longitudeDelta: 0.00921,
        });
        setSelectedLocation({
          latitude,
          longitude,
        });
        setLoading(false); // Set loading to false after successful fetch
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const handleMapPress = (event: any) => {
    // Update the selected location when the user taps on the map
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      const response = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${HereApiKey}`,
      );

      //https://discover.search.hereapi.com/v1/discover?at=21.06709,105.79093666666668&limit=2&q=lang+chu+tich&apiKey=03fWIyqkmI1EgCiSIHQkm0fxYbdmYoIIOvutYnIQ0YY

      const data = await response.json();
      console.log(data.items[0]);
      if (data) {
        return data.items[0].title;
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      throw new Error('Error fetching address' + error);
    }
  };

  const getAddressFromTitle = async (
    latitude: number,
    longitude: number,
    query: string,
  ) => {
    try {
      const response = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&limit=3&q=${query}&apiKey=${HereApiKey}`,
      );

      const data = await response.json();
      console.log(data.items[0]);
      if (data) {
        return data.items[0];
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      throw new Error('Error fetching address' + error);
    }
  };

  const handleSaveLocation = async () => {
    if (selectedLocation) {
      setLocation(selectedLocation.latitude, selectedLocation.longitude); //save to mmkv/ zustand
      try {
        const userAddress = await getAddressFromCoordinates(
          selectedLocation.latitude,
          selectedLocation.longitude,
        );
        console.log(userAddress);

        await setDoc(doc(FIRESTORE, 'users', uid), {
          address: userAddress,
          coordinates: {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          },
        })
          .then(() => {
            console.log('User location saved successfully.');
          })
          .catch(error => {
            console.error('Error saving user location:', error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchLocation = async (query: string) => {
    if (selectedLocation) {
      try {
        const address = await getAddressFromTitle(
          selectedLocation.latitude,
          selectedLocation.longitude,
          query,
        );
        console.log('dia chi tim dc ' + address.title);
        console.log(address.position);
        //set pin location based on search
        setSelectedLocation({
          latitude: address.position.lat,
          longitude: address.position.lng,
        });
        // Animate the map view to the new selected location
        mapRef.current?.animateToRegion({
          latitude: address.position.lat,
          longitude: address.position.lng,
          latitudeDelta: 0.00122,
          longitudeDelta: 0.00921,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleMapPress}
            provider="google">
            {selectedLocation && (
              <Marker coordinate={selectedLocation} draggable />
            )}
          </MapView>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search your address:"
              onSearch={handleSearchLocation}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save Location" onPress={handleSaveLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 10, // Center vertically
    left: 0,
    right: 0,
    alignItems: 'center', // Center horizontally
    zIndex: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default LocationScreen;
