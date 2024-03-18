// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCL_UcXh6mqUVrQst5ZhUm8dUv5yDCChZc',
  authDomain: 'disha-fashion.firebaseapp.com',
  projectId: 'disha-fashion',
  storageBucket: 'disha-fashion.appspot.com',
  messagingSenderId: '694264058453',
  appId: '1:694264058453:web:59ba9eccdfb6d0cf2efadc'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const getFirebaseAuth = () => getAuth(getApp());
export const auth = getAuth(app);
