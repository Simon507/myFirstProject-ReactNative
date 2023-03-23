import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PostScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
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
