// // import { getFirebaseAuth } from '../service/firebase';
// // import { async } from "@firebase/util";
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase-config';
// // import React, {useEffect} from "react";
// // import { useState } from "react";
// // import { authentication, getFirebaseAuth } from "../firebaseAuth/firebase";

// // import  firebase from "firebase/app";

// export default async function getAuthToken() {
//   // const [users, setUsers] = useState(null);

//   // const [valueToken , setValueToken ] = useState(false)

//   try {
//     const someFunction = async () => {
//       // 1 - Create a new Promise
//       return new Promise(function (resolve) {
//         // console.log(reject);
//         onAuthStateChanged(auth, (user) => {
//           resolve(user);
//         });
//       });
//     };
//     const _currentUser = await someFunction();

//     if (_currentUser) {
//       // console.log("_currentUser", _currentUser)
//       const _idToken = await _currentUser.getIdToken(false);
//       console.log("token  is here ",_idToken.toString())

//       return `Bearer ${_idToken.toString()}`;
//     } else {
//       // console.log("_currentUser2", _currentUser)
//       return undefined;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

export default async function getAuthToken() {
  try {
    const someFunction = async () => {
      return new Promise(function (resolve) {
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      });
    };
    const currentUser = await someFunction();

    if (currentUser) {
      const idToken = await currentUser.getIdToken(true); // Get authentication token (access token)
      // console.log("Auth Token is here:", idToken.toString());
      // localStorage.setItem('Token', idToken.toString())
      const refreshToken = await currentUser.getIdTokenResult(); // Get refresh token
      // console.log("Refresh Token is here:", refreshToken.refreshToken);

      return {
        accessToken: `Bearer ${idToken.toString()}`,
        refreshToken: refreshToken.refreshToken
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
