import React from 'react';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

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

  const MainStack = createStackNavigator(); // вказує на групу навігаторів

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <MainStack.Navigator>
        {/* Заміна Switch */}
        <MainStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        {/* Заміна Route */}

        {/* <MainStack.Screen name="Home" component={Home} /> */}
      </MainStack.Navigator>
      {/* <LoginScreen> </LoginScreen> */}
      {/* <RegistrationScreen> </RegistrationScreen> */}
    </NavigationContainer>
  );
}
