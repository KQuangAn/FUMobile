import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {addDoc, collection} from 'firebase/firestore';
import {ref, uploadString} from 'firebase/storage';
import {FIRESTORE, FIREBASE_STORAGE} from '../../firebase/FirebaseConfig';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import ImageSlider from '../../components/ImageSlider';

const SellerCreateScreen = () => {
  const {control, handleSubmit} = useForm();
  const [images, setImages] = React.useState<string[]>([]);

  const openCameraPicker = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1, // Image quality (0 to 1)
      selectionLimit: 10,
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // Selected image URI
          const assets = response.assets;
          if (assets) {
            const uri: string[] = assets.map(item => item.uri);
            setImages(uri);
          }
        }
      });
    }
  };
  const openImagePicker = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1, // Image quality (0 to 1)
      selectionLimit: 10,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Selected image URI
        const assets = response.assets;
        if (assets) {
          const uri: string[] = assets.map(item => item.uri);
          setImages(uri);
        }
      }
    });
  };

  // const handleImageUpload = async () => {
  //   if (selectedImage) {
  //     const imageRef = ref(FIREBASE_STORAGE, `images/${selectedImage}`);
  //     const imageData = await fetch(selectedImage);
  //     const imageBlob = await imageData.blob();

  //     try {
  //       await uploadString(imageRef, imageBlob, 'data_url');
  //       console.log('Image uploaded successfully');
  //       setSelectedImage(null);
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   }
  // };
  const onSubmitRestaurant = async data => {
    try {
      // Validate the form before submitting
      if (!data.restaurantName) {
        console.error('Restaurant name is required');
        return;
      }

      // Create restaurant document in Firestore
      const restaurantRef = await addDoc(
        collection(FIRESTORE, 'restaurants'),
        data,
      );
      const restaurantId = restaurantRef.id;

      // Display success message or navigate to another screen
      console.log('Restaurant created successfully');
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  const handleImageUpload = async (file, restaurantId) => {
    const storageRef = ref(
      FIREBASE_STORAGE,
      `restaurants/${restaurantId}/${file.name}`,
    );
    await uploadString(storageRef, file, 'data_url');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Restaurant</Text>
      <CustomInput
        placeholder="Restaurant Name"
        control={control}
        name="restaurantName"
        rules={{required: 'Restaurant Name is required'}}
      />
      <CustomInput
        placeholder="Restaurant Description"
        control={control}
        name="restaurantDescription"
        rules={{required: 'Restaurant Description is required'}}
      />
      <CustomInput
        placeholder="Restaurant Location"
        control={control}
        name="restaurantLocation"
        rules={{required: 'Restaurant Location is required'}}
      />
      <CustomInput
        placeholder="Restaurant Address"
        control={control}
        name="restaurantAddress"
        rules={{required: 'Restaurant Address is required'}}
      />
      <CustomInput
        placeholder="Restaurant Category"
        control={control}
        name="restaurantCategory"
        rules={{required: 'Restaurant Category is required'}}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <Text style={styles.buttonText}>Chọn từ điện thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCameraPicker}>
          <Text style={styles.buttonText}>Chọn từ máy ảnh </Text>
        </TouchableOpacity>
        {images && (
          <View style={styles.imageContainer}>
            <ImageSlider images={images} />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmitRestaurant)}>
        <Text style={styles.buttonText}>Create Restaurant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  uploadButton: {
    backgroundColor: '#00970F',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SellerCreateScreen;
