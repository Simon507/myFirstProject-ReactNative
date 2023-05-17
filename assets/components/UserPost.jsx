import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import React from 'react';

export const UserPosts = ({ post, navigation }) => {
  let date = new Date(post.location.timestamp);
  let dd = date.getDate(date);
  let mm = date.getMonth(date) + 1;
  let yy = date.getFullYear(date);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: post.photo }}
        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 5 }}
      />
      <View style={styles.userPost}>
        <Text style={{ fontSize: 15, fontWeight: 700 }}>{post.lablePhoto}</Text>
        {/* <TouchableOpacity
          style={styles.button}
            style={styles.textContainer}
          onPress={() => navigation.navigate('MapScreen', { location: post.location })}
        >
          <Ionicons name="location-sharp" size={24} color="#FF6C00" />
          <Text>Место фото</Text>
          <Text>{post.country},</Text>
        <Text>{post.city}</Text>
          <FontAwesome name="hand-o-left" size={20} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
            style={styles.textContainer}
          onPress={() =>
            navigation.navigate('CommentsScreenPosts', {
              postId: post.id,
              uri: post.photo,
            })
          }
        >
          <MaterialCommunityIcons name="comment-processing-outline" size={24} color="#FF6C00" />
          <Text>Комментарии</Text>
          <FontAwesome name="hand-o-left" size={20} color="#BDBDBD" />
        </TouchableOpacity> */}
        <Text>Дата фото</Text>
        <Text>{`${dd}/${mm}/${yy}`}</Text>
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
    marginBottom: 5,
    marginLeft: 5,
    zIndex: 100,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#add1db',
    paddingRight: 3,
    paddingLeft: 3,
    borderRadius: 6,
  },
});
