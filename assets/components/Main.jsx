import React from 'react';
import { useState, useEffect } from 'react';

// import { moduleName } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import UseRoute from '../router';

import { StatusState } from '../../redux/autorisation/authOperations';

import { auth } from '../../fireBase/config';
import { onAuthStateChanged } from 'firebase/auth';

const Main = () => {
  //   const [userId, setUserId] = useState(null);

  const stateChange = useSelector(state => state);
  //   console.log(stateChange);
  //   console.log(stateChange.autorisation.stateChange);

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
  // console.log(route);

  //   if (route === 'false') {
  //     console.log(`asdad`);
  //   }

  const routing = UseRoute(route);

  return <NavigationContainer onLayout={onLayoutRootView}>{routing}</NavigationContainer>;
};

export default Main;
