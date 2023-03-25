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
      <NectedScreen.Screen name="DefaultScreen" component={DefaultScreen} />
      <NectedScreen.Screen name="CommentsScreenPosts" component={CommentsScreenPosts} />
      <NectedScreen.Screen name="MapScreen" component={MapScreen} />
    </NectedScreen.Navigator>
  );
};

export default PostsScreen;
