import React, {useState} from 'react';
import {View, Button, Image, StyleSheet} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import type {Asset} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../navigation/navigation';

type Props = NativeStackScreenProps<ProfileStackParams, 'Upload'>;

const DishUploadScreen = ({sellerId, dishId}: Props) => {
  const [imageUris, setImageUris] = useState<Asset[]>();

  const handleCaptureImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 5, // Allow selection of up to 5 images
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User canceled image selection');
        } else if (response.errorMessage) {
          console.log('Image selection error:', response.errorMessage);
        } else {
          const selectedImageUris = response?.assets;
          setImageUris(selectedImageUris);
        }
      },
    );
  };

  const handleUploadImages = async () => {
    const storagePromises = imageUris.map(async uri => {
      const storageRef = storage().ref(
        `sellers/${sellerId}/dishes/${dishId}/${uri}`,
      );
      const task = storageRef.putFile(uri);

      try {
        await task;
        console.log('Image uploaded to Firebase Storage');
        // Get the download URL
        const downloadURL = await storageRef.getDownloadURL();
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });

    const downloadURLs = await Promise.all(storagePromises);
    const filteredURLs = downloadURLs.filter(url => url !== null);

    // Update the Firestore document with the image URLs
    if (filteredURLs.length > 0) {
      const firestore = firebase.firestore();
      await firestore
        .collection('dishes')
        .doc(dishId)
        .update({imageUrls: filteredURLs});

      console.log('Image URLs updated in Firestore');
    }
  };

  return (
    <View style={styles.container}>
      {/* {imageUris? imageUris.map(image => (
          <Image key={image.id} source={{ image.uri }} style={styles.image} />
        )) : null } */}
      <Button title="Select Images" onPress={handleCaptureImages} />
      <Button title="Upload Images" onPress={handleUploadImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default DishUploadScreen;
