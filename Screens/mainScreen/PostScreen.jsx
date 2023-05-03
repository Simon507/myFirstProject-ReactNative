import React from 'react';

import { moduleName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultScreen from '../nestedScreens/DefaultScreen';
import CommentsScreenPosts from '../nestedScreens/CommentsScreenPosts';
import MapScreen from '../nestedScreens/MapScreen';

const NectedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NectedScreen.Navigator>
      <NectedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerShown: false,
        }}
      />
      <NectedScreen.Screen
        name="CommentsScreenPosts"
        component={CommentsScreenPosts}
        options={{
          headerTitle: 'Ко всем постам',
          // headerShown: false,
        }}
      />
      <NectedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: 'Ко всем постам',
          // headerShown: false,
        }}
      />
    </NectedScreen.Navigator>
  );
};

export default PostsScreen;
