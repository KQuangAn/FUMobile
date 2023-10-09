import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useRentalStore} from '../../store/store';
import FilterPopup from '../FilterPopup';
import SearchComponent from '../SearchComponent';

interface RentalHeaderProps {}

const RentalHeader: React.FC<RentalHeaderProps> = () => {
  const Filters = ['beds', 'rooms', 'price', 'reviews'];
  const setSelectedFilter = useRentalStore(state => state.setSelectedFilter);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const selectedFilter = useRentalStore(state => state.selectedFilter);

  const renderFilters = ({item}: {item: string}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => applyFilter(item)}
      style={styles.filterButton}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const toggleFilterPopup = (filterName: string) => {
    setIsFilterPopupVisible(!isFilterPopupVisible);
  };

  const applyFilter = (filterName: string) => {
    setSelectedFilter(filterName);
    toggleFilterPopup(filterName);

    // Apply filter logic to modify rentals list
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>COCDOI</Text>
      <View style={styles.headerContent}>
        <SearchComponent
          placeholder="What do you want to find?"
          onSearch={() => console.log('//todo')}
        />
        <View style={styles.filterContainer}>
          <FlatList
            data={Filters}
            renderItem={renderFilters}
            keyExtractor={item => item}
            horizontal
          />
        </View>
      </View>

      {/* Filter Popup */}
      <FilterPopup
        visible={isFilterPopupVisible && selectedFilter !== ''}
        onClose={() => toggleFilterPopup(selectedFilter)}
        onApply={(minValue: number, maxValue: number) => {
          // Apply filter range logic here based on selectedFilter, minValue, and maxValue
          toggleFilterPopup(selectedFilter);
          console.log(minValue, maxValue);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 40,
    color: '#008000',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    marginTop: 20,
  },
  filterButton: {
    margin: 2,
    padding: 2,
    backgroundColor: 'red', // Change to your desired color
    borderRadius: 20,
  },
});

export default React.memo(RentalHeader);
