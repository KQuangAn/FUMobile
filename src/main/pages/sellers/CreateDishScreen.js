import {firebase} from '@react-native-firebase/firestore';
import {featured} from './yourDataFile'; // Import your data

import React from 'react';
import {useForm} from 'react-hook-form';
import {View, TextInput, Button, Text} from 'react-native';

// Assuming you have already initialized Firebase

const saveFeaturedRestaurantsToFirebase = async () => {
  const firestore = firebase.firestore();

  try {
    for (const restaurant of featured.restaurants) {
      const {id, title, description, ...rest} = restaurant;
      await firestore
        .collection('restaurants')
        .doc(id.toString())
        .set({
          title,
          description,
          ...rest,
        });
    }
    console.log('Featured restaurants data saved to Firebase.');
  } catch (error) {
    console.error('Error saving featured restaurants data:', error);
  }
};

const FoodItemForm = ({onSubmit}) => {
  const {register, handleSubmit, setValue, reset} = useForm();

  // Define form submission handler
  const handleFormSubmit = data => {
    onSubmit(data);
    reset();
  };

  return (
    <View>
      <Text>Create or Update Food Item</Text>
      <TextInput
        placeholder="Food Name"
        onChangeText={text => setValue('name', text)}
      />
      <TextInput
        placeholder="Price"
        onChangeText={text => setValue('price', text)}
      />
      <TextInput
        placeholder="Description"
        onChangeText={text => setValue('description', text)}
      />
      <Button title="Submit" onPress={handleSubmit(handleFormSubmit)} />
    </View>
  );
};

export default FoodItemForm;

// Call the function to save data
saveFeaturedRestaurantsToFirebase();
