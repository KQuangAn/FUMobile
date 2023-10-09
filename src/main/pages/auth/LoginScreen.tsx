import {
  ActivityIndicator,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../firebase/FirebaseConfig';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {useAuthStore} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {FIRESTORE} from '../../firebase/FirebaseConfig';
import {doc, getDoc} from 'firebase/firestore';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

type signInFormValues = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const {control, handleSubmit} = useForm<signInFormValues>();
  const login = useAuthStore(state => state.login);
  const setUserInfo = useAuthStore(state => state.setUserInfo);
  const navigation = useNavigation();
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  const signIn = async (formData: {email: string; password: string}) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      if (response.user) {
        const userDataDocRef = doc(FIRESTORE, 'users', response.user.uid);
        const userDataSnapshot = await getDoc(userDataDocRef);

        if (userDataSnapshot.exists()) {
          const userData = userDataSnapshot.data();
          setUserInfo(userData);
          console.log(userData);
          // Check user's role and perform actions based on it
          if (userData && userData.role === 'seller') {
            // User is a seller
            // Handle seller-specific actions
          } else {
            // User is not a seller
            // Handle other user actions
          }

          login(response.user);
          console.log('User logged in successfully');
        }
      }
    } catch (error: any) {
      console.log('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue!</Text>
      </View>

      <KeyboardAvoidingView behavior="height" style={styles.formContainer}>
        <CustomInput
          name="email"
          placeholder="Email address"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: EMAIL_REGEX,
          }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
            maxLength: {
              value: 24,
              message: 'Password should be no more than 24 characters',
            },
          }}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={styles.activityIndicator}
          />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(signIn)}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center', marginTop: 10}}>
          <Text style={{color: '#006600', fontSize: 16}}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%', alignItems: 'center', marginTop: 10}}>
          <Text style={{color: '#006600', fontSize: 16}}>
            Login with Google
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <TouchableOpacity onPress={() => onSignUpPressed()}>
            <Text style={{color: '#006600', fontSize: 16}}>
              I am a new user,sign me up!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    margin: 20,
    marginTop: 50,
  },
  title: {
    color: '#547C74',
    fontSize: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  formContainer: {
    flex: 3,
    margin: 20,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#00970F',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
