import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

interface CustomInputProps {
  control: any;
  name: string;
  rules?: any;
  placeholder: string;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <Text style={styles.placeholder}>{placeholder}</Text>
            <View
              style={[
                styles.inputContainer,
                error ? styles.inputError : styles.inputDefault,
              ]}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: '100%',
  },
  placeholder: {
    color: 'black',
    marginBottom: 4,
    fontSize: 15,
    fontWeight: '400',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderRadius: 8,
    marginTop: 6,
  },
  inputDefault: {
    borderColor: 'gray',
  },
  inputError: {
    borderColor: 'red',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    color: 'black',
  },
  errorText: {
    color: 'red',
  },
});

export default React.memo(CustomInput);
