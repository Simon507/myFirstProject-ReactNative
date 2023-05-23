import React from 'react';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import UseRoute from '../router';

import { StatusState } from '../../redux/autorisation/authOperations';

const Main = () => {
  const stateChange = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StatusState());
  }, []);

  const [fontsLoaded] = useFonts({
    MerriweatherRegular: require('../fonts/MerriweatherRegular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const route = JSON.parse(stateChange.autorisation.stateChange);

  const routing = UseRoute(route);

  return <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>;
};

export default Main;
