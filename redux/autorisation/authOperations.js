import { initialApp } from '../../fireBase/config';

import { authSlice } from '../autorisation/authReducer';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const auth = getAuth(initialApp);

export const RegisterDb =
  ({ email, password, nickName, photoURL }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: nickName,
        photoURL: photoURL,
      })
        .then(() => {
          const user = auth.currentUser;
          dispatch(
            authSlice.actions.updateUserProfile({
              userId: user.uid,
              nickName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        })
        .then(authSignInUser(email, password));
    } catch (error) {
      console.log(error.code);
    }
  };

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
