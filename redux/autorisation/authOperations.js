import { auth } from '../../fireBase/config';

import { authSlice } from '../autorisation/authReducer';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const RegisterDb = (email, password, nickName) => async (dispatch, getState) => {
  console.log(`peredano`, `${email} + ${password} + ${nickName}`);
  createUserWithEmailAndPassword(auth, email, password, nickName)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: nickName,
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch(error => {
          // An error occurred
          // ...
        });
      console.log(user);

      // user.updateUserProfile({ displayName: nickName });
      // dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, nickName: displayName }));
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // Toast.show({
      //   type: 'success',
      //   text1: errorCode,
      //   text2: errorMessage,
      // });
      // return <Toast style={styles.toaster} />;
      // ..
    });
};

export const enterDb = (email, password) => async (dispatch, getState) => {
  console.log(`peredano`, `${email} + ${password}`);
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // Toast.show({
      //   type: 'success',
      //   text1: errorCode,
      //   text2: errorMessage,
      // });
      // return <Toast style={styles.toaster} />;
      // ..
    });
};

// export const changeUser = (email, password, nickName) => async (dispatch, getState) => {
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       user.updateUserProfile({ displayName: nickName });
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;

//       dispatch();
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };

// const exitDb = () => async (dispatch, getState) => {};
