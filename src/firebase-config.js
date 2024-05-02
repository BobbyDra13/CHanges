// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAM2GlH6w3lMfX9RMi7ZJ0qxdZyp9WViIs',
  authDomain: 'disha-smart.firebaseapp.com',
  projectId: 'disha-smart',
  storageBucket: 'disha-smart.appspot.com',
  messagingSenderId: '369190890097',
  appId: '1:369190890097:web:b3e7aae2aba2f20776c9d0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const getFirebaseAuth = () => getAuth(getApp());
export const auth = getAuth(app);
