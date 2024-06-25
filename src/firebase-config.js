// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBT3qc4RqBL3YXX0OS-GqViwtu-vobSNM",
  authDomain: "disha-rr-tira.firebaseapp.com",
  projectId: "disha-rr-tira",
  storageBucket: "disha-rr-tira.appspot.com",
  messagingSenderId: "70285861770",
  appId: "1:70285861770:web:604087906bd2d3933d1e73"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const getFirebaseAuth = () => getAuth(getApp());
export const auth = getAuth(app);
