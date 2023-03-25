import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet } from 'react-native';

const MapScreen = ({ navigation }) => {
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
      <Text>MapScreen</Text>
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

export default MapScreen;
