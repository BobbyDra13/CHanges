// import { getFirebaseAuth } from '../service/firebase';
// import { async } from "@firebase/util";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase.config';
// import React, {useEffect} from "react";
// import { useState } from "react";
// import { authentication, getFirebaseAuth } from "../firebaseAuth/firebase";

// import  firebase from "firebase/app";

export default async function getAuthToken() {
  // const [users, setUsers] = useState(null);

  // const [valueToken , setValueToken ] = useState(false)

  try {
    const someFunction = async () => {
      // 1 - Create a new Promise
      return new Promise(function (resolve) {
        // console.log(reject);
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      });
    };
    const _currentUser = await someFunction();

    if (_currentUser) {
      // console.log("_currentUser", _currentUser)
      const _idToken = await _currentUser.getIdToken(false);
      // console.log("token  is here ",_idToken)

      return `Bearer ${_idToken.toString()}`;
    } else {
      // console.log("_currentUser2", _currentUser)
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
