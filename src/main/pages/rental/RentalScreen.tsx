import {FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import {rentals} from '../../apis/index';
import RentalCard from '../../components/Rental/RentalCard';
import RentalHeader from '../../components/Rental/RentalHeader';
import {useRentalStore} from '../../store/store';

interface Room {
  bedCount: number;
  price: number;
  // Add more room properties if needed
}

interface Rental {
  id: number;
  title: string;
  images: string[];
  description: string;
  address: string;
  contactNumber: string;
  contactName: string;
  policy: string;
  rooms: Room[];
  reviews: string[];
}

export default function RentalScreen() {
  const selectedFilter = useRentalStore(state => state.selectedFilter);

  const filteredRentals: Rental[] = rentals.filter(rental => {
    if (selectedFilter === 'beds') {
      return rental.rooms.some(room => room.bedCount >= 2);
    } else if (selectedFilter === 'price') {
      return rental.rooms.some(room => room.price <= 1000000);
    }
    return true;
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <RentalHeader />
      <FlatList
        data={filteredRentals}
        renderItem={({item}) => (
          <RentalCard
            id={item.id}
            title={item.title}
            images={item.images}
            description={item.description}
            address={item.address}
            contactNumber={item.contactNumber}
            contactName={item.contactName}
            policy={item.policy}
            rooms={item.rooms}
            reviews={item.reviews}
          />
        )}
        keyExtractor={item => item.id.toString()}
        style={{width: '100%', height: '100%'}}
      />
    </SafeAreaView>
  );
}
