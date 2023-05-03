import { initialApp } from '../../fireBase/config';

import { authSlice } from '../autorisation/authReducer';
// import { useDispatch } from 'react-redux';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const auth = getAuth(initialApp);

export const RegisterDb = (email, password, nickName) => async (dispatch, getState) => {
  // console.log(`peredano`, `${email} + ${password} + ${nickName}`);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: nickName,
      // photoURL: photoURL,
    })
      .then(() => {
        const user = auth.currentUser;
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickName: user.displayName,
            // photoURL: user.photoURL,
          })
        );
      })
      .then(authSignInUser(email, password));
  } catch (error) {
    console.log(error.code);
  }
};

// .then(userCredential => {
//   // Signed in
//   const user = userCredential.user;
//   updateProfile(auth.currentUser, {
//     displayName: nickName,
//     stateChange: true,

//     // photoURL: 'https://example.com/jane-q-user/profile.jpg',
//   })
//     .then(() => {
//       // const dispatch = useDispatch();
//       dispatch(authSlice.actions.authStateChange());
//     })
//     .catch(error => {
//       // An error occurred
//       // ...
//     });
//   console.log(user);

//       user.updateUserProfile({ displayName: nickName });
//       dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, nickName: displayName }));
//       // ...
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       console.log(errorCode);
//       const errorMessage = error.message;
//       console.log(errorMessage);
//       // Toast.show({
//       //   type: 'success',
//       //   text1: errorCode,
//       //   text2: errorMessage,
//       // });
//       // return <Toast style={styles.toaster} />;
//       // ..
//     });
// };

export const enterDb = (email, password) => async (dispatch, getState) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
    });
  } catch (error) {
    console.log(error.code);
  }
};

export const StatusState = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
        photoURL: user.photoURL,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export const exitDb = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      dispatch(authSlice.actions.authSignOut());
    })
    .catch(error => {
      console.log(error.code);
    });
};
