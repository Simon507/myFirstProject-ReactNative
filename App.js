import React from 'react';
import { useState, useEffect } from 'react';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';

import UseRoute from './assets/router';

export default function App() {
  const [name, setName] = useState(1);

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

  // const OnLoad = target => {
  //   console.log(target);
  // };

  const routing = UseRoute(name);

  return <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>;
}
