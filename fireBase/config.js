import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDZ70dEjvzxFLnUqJSkqby7YJ_kr2UNotg',
  authDomain: 'my-react-native-social.firebaseapp.com',
  projectId: 'my-react-native-social',
  storageBucket: 'my-react-native-social.appspot.com',
  messagingSenderId: '435422371248',
  appId: '1:435422371248:web:62a64c36693722878a4a75',
  measurementId: 'G-6E1M54PBGG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const RegisterDb = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};
