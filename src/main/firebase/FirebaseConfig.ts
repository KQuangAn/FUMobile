// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore, getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'; // Import storage functionality

const firebaseConfig = {
  apiKey: 'AIzaSyBMCWlVan833NWJZkXB9P1D83cjAsqbV5U',
  authDomain: 'cocdoi-75bdb.firebaseapp.com',
  projectId: 'cocdoi-75bdb',
  storageBucket: 'cocdoi-75bdb.appspot.com',
  messagingSenderId: '749142647328',
  appId: '1:749142647328:web:6949c7cede94d603325245',
  measurementId: 'G-D0SXQ5HD5W',
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = initializeFirestore(FIREBASE_APP, {
  experimentalForceLongPolling: true,
});
const FIRESTORE = getFirestore(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP); // Initialize Firebase Storage

export {FIREBASE_STORAGE, FIREBASE_AUTH, FIRESTORE};
