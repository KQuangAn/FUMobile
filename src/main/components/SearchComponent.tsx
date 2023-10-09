import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-eva-icons';

interface SearchComponentProps {
  placeholder: string;
  data: Record<string, string>;
  onSearch: (searchText: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder,
  data,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" width={20} height={20} fill="#00970F" />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: -20,
    marginVertical: 20,
    borderRadius: 30,
    backgroundColor: '#FAFAFA',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
});

export default React.memo(SearchComponent);
