import React from 'react';
import { useState, useEffect } from 'react';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';

import UseRoute from './assets/router';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { auth } from './fireBase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [userId, setUserId] = useState(false);

  const [fontsLoaded] = useFonts({
    MerriweatherRegular: require('./assets/fonts/MerriweatherRegular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUserId(uid);

      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const routing = UseRoute(userId);

  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>
    </Provider>
  );
}
