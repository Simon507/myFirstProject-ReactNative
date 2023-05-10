import { initializeApp } from 'firebase/app';

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

const initialApp = initializeApp(firebaseConfig);

export { initialApp };
