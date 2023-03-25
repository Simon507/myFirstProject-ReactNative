import * as firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZ70dEjvzxFLnUqJSkqby7YJ_kr2UNotg',
  authDomain: 'my-react-native-social.firebaseapp.com',
  projectId: 'my-react-native-social',
  storageBucket: 'my-react-native-social.appspot.com',
  messagingSenderId: '435422371248',
  appId: '1:435422371248:web:62a64c36693722878a4a75',
  measurementId: 'G-6E1M54PBGG',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

// export const auth = firebase.auth();
// export const db = firebase.firestore();
// export const storage = firebase.storage();

// export { auth, db, storage };
