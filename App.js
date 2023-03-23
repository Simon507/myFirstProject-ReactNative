import React from 'react';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';

import UseRoute from './assets/router';

export default function App() {
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

  const routing = UseRoute(1);

  return <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>;
}
