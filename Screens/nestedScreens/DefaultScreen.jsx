import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Button } from 'react-native';
// import { Button } from 'react-native-web';

const PostScreen = ({ navigation }) => {
  //   console.log(navigation);
  // console.log(navigation.isFocused());
  //   console.log(navigation.getState());

  const from = 'PostScreen';
  // useEffect(() => {
  //   console.log(`зщыеы`);
  // }, []);

  // navigation.navigate('Cren', from);

  return (
    <View style={styles.container}>
      <Button
        title="комменты"
        onPress={() => {
          navigation.navigate('CommentsScreenPosts');
        }}
      ></Button>

      <Button
        title="Карта"
        onPress={() => {
          navigation.navigate('MapScreen');
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostScreen;
