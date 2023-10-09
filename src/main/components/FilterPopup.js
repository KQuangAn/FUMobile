import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
const FilterPopup = ({visible, onClose, onApply}) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const minInputRef = React.useRef(null); // Create a ref for the input field

  React.useEffect(() => {
    if (visible && minInputRef.current) {
      // Focus the input field when the popup becomes visible
      minInputRef.current.focus();
    }
  }, [visible]);
  const handleApply = () => {
    onApply(minValue, maxValue);
    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
        <View className="flex-1 justify-end">
          <View className="bg-black/50 flex-1" />
          <TouchableOpacity>
            <KeyboardAvoidingView behavior="position" enabled>
              <View className="bg-white p-5">
                <View className="flex-row justify-end">
                  <TouchableOpacity onPress={onClose}>
                    <Icon name="close-outline" width={24} height={24} />
                  </TouchableOpacity>
                </View>
                <Text>Set Filter Range</Text>
                <TextInput
                  ref={minInputRef}
                  placeholder="Min Value"
                  onChangeText={text => setMinValue(text)}
                  value={minValue}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Max Value"
                  onChangeText={text => setMaxValue(text)}
                  value={maxValue}
                  keyboardType="numeric"
                />
                <View className="items-center">
                  <TouchableOpacity
                    className="w-5/6 p-2 rounded-3xl justify-center items-center text-center bg-black text-white"
                    onPress={handleApply}>
                    <Text className="text-white">Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default React.memo(FilterPopup);
