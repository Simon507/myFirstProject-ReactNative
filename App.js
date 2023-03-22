// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

// import { AppLoading } from 'expo';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

import { StyleSheet, Text, View, ImageBackground, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

// const LoadFont = async () => {
//   await Font.loadAsync({
//     AlkatraVariableFont: require('./assets/fonts/AlkatraVariableFont.ttf'),
//   });
// };

// const loadFonts = async () => {
//   await Font.loadAsync({
//     crimsonTextRegular: require('./assets/fonts/crimsoncextregular.ttf'),
//     crimsonTextBold: require('./assets/fonts/crimsontextbold.ttf'),
//     get crimsonTextBold() {
//       return this._crimsonTextBold;
//     },
//     set crimsonTextBold(value) {
//       this._crimsonTextBold = value;
//     },
//   });
// };

export default function App() {
  // useEffect(() => {
  //   const onOrientationChange = () => {
  //     const widthScreen = Dimensions.get('window').width;
  //     setDimensions(widthScreen);
  //   };
  //   Dimensions.addEventListener('change', onOrientationChange);
  //   return () => {
  //     Dimensions.removeEventListener('change', onOrientationChange);
  //   };
  // }, []);

  // if (!fontIsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFont}
  //       onFinish={() => {
  //         setFontIsReady(true);
  //       }}
  //       onError={console.warn}
  //     ></AppLoading>
  //   );
  // }

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

  // if (!isReady) {
  //   return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />;
  // }

  return (
    <NavigationContainer style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground style={styles.image} source={require('./assets/images/bgImage.jpg')}>
        {/* <LoginScreen> </LoginScreen> */}
        <RegistrationScreen> </RegistrationScreen>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%' },
});
