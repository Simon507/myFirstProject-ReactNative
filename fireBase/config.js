import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDZ70dEjvzxFLnUqJSkqby7YJ_kr2UNotg',
  authDomain: 'my-react-native-social.firebaseapp.com',
  databaseURL: 'https://my-react-native-social-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'my-react-native-social',
  storageBucket: 'my-react-native-social.appspot.com',
  messagingSenderId: '435422371248',
  appId: '1:435422371248:web:51d734de37aa74dd8a4a75',
  measurementId: 'G-ZL8WND45TQ',
};

// Initialize Firebase
const initialApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// export { auth };
export { initialApp };
