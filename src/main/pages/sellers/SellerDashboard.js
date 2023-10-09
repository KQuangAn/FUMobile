import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RevenueBarChart from './RevenueBarChart';
import ManageFoodItems from './ManageFoodItems';
import {FIRESTORE} from '../../firebase/FirebaseConfig';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {useAuthStore} from '../../store/store';

const SellerDashboard = () => {
  const user = useAuthStore(state => state.user);
  const [loading, setIsLoading] = React.useState(false);

  //fetch restaurant data from firebase
  const getData = async () => {
    const restaurantRef = collection(FIRESTORE, 'restaurants');
    const q = query(restaurantRef, where('owner', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
    });
    setIsLoading(false);
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Seller Dashboard</Text>
          <RevenueBarChart />
          <ManageFoodItems />

          <TouchableOpacity>
            <Text>Thông tin cửa hàng</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SellerDashboard;
