import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import SearchComponent from '../SearchComponent';
import AppText from '../AppText';

const Filters = [
  {
    bedNumber: null,
    priceRange: null,
    yearEstablished: null,
  },
];

const RestaurantHeader: React.FC = () => {
  //const [headerVisible, setHeaderVisible] = React.useState(true);
  //const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={styles.title1}>COC</AppText>
        <AppText style={styles.title2}>DOI</AppText>
      </View>

      <SearchComponent
        placeholder="What do you want to find?"
        onSearch={() => console.log('//todo')}
      />

      {/* Add buttons or pressable filters */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },

  title1: {
    fontSize: 40,
    color: '#000000',
  },
  title2: {
    fontSize: 40,
    color: '#008000',
  },

  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: -20,
    marginVertical: 20,
    borderRadius: 30,
    backgroundColor: '#FAFAFA',
    color: '00970F',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
});

export default React.memo(RestaurantHeader);
