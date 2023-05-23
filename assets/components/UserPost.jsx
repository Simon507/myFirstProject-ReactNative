import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';

export const UserPosts = ({ post }) => {
  let date = new Date(post.location.timestamp);
  let dd = date.getDate(date);
  let mm = date.getMonth(date) + 1;
  let yy = date.getFullYear(date);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: post.photo }} />
      <View style={styles.userPost}>
        <Text style={{ fontSize: 15, fontWeight: 700 }}>{post.lablePhoto}</Text>
        <View style={styles.textContainer}>
          <Text>Дата фото:</Text>
          <Text>{`${dd}/${mm}/${yy}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: 'center',
    borderBottomColor: '#D9EBE9',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userPost: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  textContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    gap: 5,
  },
});
