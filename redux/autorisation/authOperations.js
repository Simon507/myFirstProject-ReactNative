import { auth } from '../../fireBase/config';

import { authSlice, authSignOut } from '../autorisation/authReducer';
import { useDispatch } from 'react-redux';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

export const RegisterDb = (email, password, nickName) => async (dispatch, getState) => {
  console.log(`peredano`, `${email} + ${password} + ${nickName}`);
  createUserWithEmailAndPassword(auth, email, password, nickName)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: nickName,
        stateChange: true,

        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          // const dispatch = useDispatch();
          dispatch(authSlice.actions.authStateChange());
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
      // const dispatch = useDispatch();

      console.log(user);

      // updateProfile(auth.currentUser, {

      //   // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      // });
      dispatch(authSlice.actions.authStateChange({ stateChange: 'true' }));
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

export const StatusState = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      // updateProfile(auth.currentUser, {
      //   displayName: nickName,
      //   stateChange: true,
      // });

      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };
      // const uid = user.uid;
      // updateProfile(auth.currentUser, {
      //   userId: uid,
      //   // displayName: nickName,
      //   // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      // });
      // const dispatch = useDispatch();
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));

      // setUserId(uid);

      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

export const exitDb = () => async (dispatch, getState) => {
  signOut(auth)
    .then(() => {
      dispatch(authSlice.actions.authSignOut({ stateChange: 'false' }));
      console.log(`ESIITTT`);
      // dispatch(authSlice.actions.authSignOut({ stateChange: false }));
    })
    .catch(error => {
      // An error happened.
    });
};
