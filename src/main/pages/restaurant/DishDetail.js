import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import BackButton from '../../components/BackButton';
import {useBasketStore} from '../../store/store';
import ImageSlider from '../../components/ImageSlider';
export default function DishDetail({route, navigation}) {
  const {dish} = route.params;
  const [showImage, setShowImage] = React.useState(false); // State to toggle the image viewer
  const [showFullDescription, setShowFullDescription] = React.useState(false); // State to toggle the full description
  const [quantity, setQuantity] = React.useState(1);
  const [checked, setChecked] = React.useState(true);
  const note = React.useRef('');
  //const toggleCheckbox = () => setChecked(!checked);
  const optionalAddon = dish?.optional;
  const addToBasket = useBasketStore(state => state.addToBasket);
  // Calculate the height of the description text
  const descriptionRef = React.useRef(null);

  //convert to vnd
  const price = dish.price.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  if (optionalAddon) {
    const initialCheckboxState = optionalAddon.reduce((acc, optionObj) => {
      const optionName = Object.keys(optionObj);
      acc[optionName] = false;
      return acc;
    }, {});
    console.log(initialCheckboxState);
  }

  // Function to toggle the image viewer
  const toggleImageViewer = index => {
    setShowImage(!showImage);
  };

  // Function to toggle the full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    quantity !== 0 ? setQuantity(quantity - 1) : null;
  };
  //add to basket when button is press
  const handleAddToBasket = () => {
    addToBasket(dish, quantity);
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={toggleImageViewer} testID="dish-image">
          <ImageSlider images={dish.image} onPress={toggleImageViewer} />
        </TouchableOpacity>
        <BackButton onPress={() => navigation.goBack()} />

        <View className="w-full bg-white">
          <View className="flex flex-row p-4 justify-between flex-wrap">
            <View className="flex flex-col w-3/4 flex-wrap whitespace-normal">
              <Text className="w-full text-lg font-bold">{dish.title}</Text>
              <Text className="text-md font-bold pt-2 ">
                {dish?.promotion} 100 off
              </Text>
            </View>
            <View className="flex w-1/4 ">
              <Text className="text-base font-bold whitespace-nowrap">
                {price}
              </Text>
              <Text className="text-xs font-light">Base Price</Text>
            </View>
            <View className="w-full">
              {showFullDescription || dish.description.length <= 45 ? ( // Adjust the character limit as needed
                <TouchableOpacity onPress={toggleDescription}>
                  <Text
                    numberOfLines={showFullDescription ? undefined : 2}
                    ellipsizeMode="tail"
                    ref={descriptionRef}
                    className="text-md font-extralight pt-2 w-full bg-white">
                    {dish.description}
                  </Text>
                  {dish.description.length > 45 && (
                    <Text
                      className="text-sm font-extralight pt-2 w-full bg-white"
                      style={{color: 'blue'}}>
                      {showFullDescription ? 'See Less' : 'See More'}
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleDescription}>
                  <Text
                    numberOfLines={showFullDescription ? undefined : 2}
                    ellipsizeMode="tail"
                    ref={descriptionRef}
                    className="text-md font-extralight pt-2 w-full bg-white">
                    {dish.description}
                  </Text>
                  <Text
                    className="text-sm font-extralight pt-2 w-full bg-white"
                    style={{color: 'blue'}}>
                    See More
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/*//////////////// Note area ////////////////////*/}
        <View className="flex flex-row flex-wrap w-full items-center mt-2 p-4 bg-white">
          <Text className="text-xl font-bold ">Note to restaurant</Text>
          <Text className="text-sm font-light "> Optional </Text>
          <View className="w-full mt-5 justify-center">
            <TextInput
              ref={note}
              onChangeText={e => (note.current.value = e)}
              placeholder="Add your request (subject to restaurant's discretion)"
            />
          </View>
        </View>

        {/*//////////////// quantity ////////////////////*/}

        <View className=" w-full  text-center justify-center items-center p-5 mt-2 bg-white  ">
          <View className="flex flex-row border border-gray-300 rounded-xl">
            <TouchableOpacity onPress={handleDecreaseQuantity}>
              <View className="w-10 h-10 justify-center items-center bg-green-500 rounded-l-xl">
                <Text>-</Text>
              </View>
            </TouchableOpacity>
            <View className="w-10 h-10 justify-center items-center mx-4">
              <Text className="text-xl">{quantity}</Text>
            </View>
            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <View className="w-10 h-10 justify-center items-center bg-green-500 rounded-r-xl">
                <Text>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*//////////////// Optional addon area ////////////////////*/}
        {optionalAddon ? (
          <View className="flex flex-row flex-wrap w-full items-center mt-2 p-4 bg-white h-64">
            <Text className="text-xl font-bold ">Optional</Text>
            <View className="w-full p-2 mt-5 border border-gray-400 border-y-gray-400 justify-center">
              {/* todo */}
              {/* {Object.entries(optionalAddon).map(([option, price]) => (
                <CheckBox
                  key={option}
                  title={option}
                  onPress={() => setOptions(...options, (option = 'true'))}>
                  <Text>{price}</Text>
                </CheckBox>
              ))} */}
            </View>
          </View>
        ) : null}
        {/*//////////////// Add to cart absolute button ////////////////////*/}
        <View className="w-full justify-center items-center p-5 mt-2 bg-white">
          <View className="w-full flex flex-row justify-between items-center my-4">
            <Text className="font-xl">Tổng</Text>
            <Text className="font-xl ">{dish.price * quantity}</Text>
          </View>
          {quantity == 0 ? (
            <TouchableOpacity
              className="flex flex-row p-1 justify-center w-full rounded bg-green-500 text-center items-center"
              onPress={() => navigation.goBack()}>
              <Text className="text-white text-xl ">Quay lại</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex flex-row  p-1 justify-center w-full bg-green-500 rounded text-center items-center"
              onPress={() => handleAddToBasket()}>
              <Text className="text-white text-xl ">Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {showImage && (
        <ImageViewer
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          imageUrls={dish.image.map(image => ({url: image}))}
          onClick={toggleImageViewer} // Close the image viewer when clicked
          enableSwipeDown // Enable swipe down to close
          onSwipeDown={toggleImageViewer} // Close the image viewer when swiped down
          testID="image-viewer"
        />
      )}
    </View>
  );
}
