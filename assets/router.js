import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';

import CreateScreen from '../Screens/mainScreen/CreateScreen';
import PostScreen from '../Screens/mainScreen/PostScreen';
import ProfileScreen from '../Screens/mainScreen/ProfileScreen';

const AutorisationStack = createStackNavigator(); // вказує на групу навігаторів
const Tab = createBottomTabNavigator();

const UseRoute = isAutorisation => {
  if (!isAutorisation) {
    return (
      <AutorisationStack.Navigator>
        <AutorisationStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <AutorisationStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </AutorisationStack.Navigator>
    );
  }

  //   screenOptions={{ tabBarShowLabel: false }}  ==  можно вставить в табюнавигатор чтоб скрыть метки

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Все посты',
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="appstore-o" size={size} color={color} />;
          },
        }}
        name="PostScreen"
        component={PostScreen}
        onPress={console.log(`111`)}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Добавить пост',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons name="tooltip-plus-outline" size={size} color={color} />;
          },
        }}
        name="CreateScreen"
        component={CreateScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ focused, color, size }) => {
            return <Fontisto name="person" size={size} color={color} />;
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default UseRoute;
