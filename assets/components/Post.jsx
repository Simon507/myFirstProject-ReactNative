import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import React from 'react';

export const Posts = ({ post, navigation }) => {
  // console.log(post);

  let date = new Date(post.location.timestamp);
  let dd = date.getDate(date);
  let mm = date.getMonth(date) + 1;
  let yy = date.getFullYear(date);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: post.photo }}
        style={{ width: 300, height: 200, borderRadius: 10, marginBottom: 5 }}
      />

      <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 5 }}>{post.lablePhoto}</Text>
      <Text style={{ marginBottom: 5 }}>Дата фото: {`${dd}/${mm}/${yy}`}</Text>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
        <TouchableOpacity
          style={styles.button}
          //   style={styles.textContainer}
          onPress={() => navigation.navigate('MapScreen', { location: post.location })}
        >
          <Ionicons name="location-sharp" size={24} color="#FF6C00" />
          <Text>Место фото</Text>
          {/* <Text>{post.country},</Text>
        <Text>{post.city}</Text> */}
          {/* <FontAwesome name="hand-o-left" size={20} color="#BDBDBD" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          //   style={styles.textContainer}
          onPress={() => {
            // console.log(post.photo);
            navigation.navigate('CommentsScreenPosts', {
              postId: post.id,
              photo: post.photo,
            });
          }}
        >
          <MaterialCommunityIcons name="comment-processing-outline" size={24} color="#FF6C00" />
          <Text>Комментарии</Text>
          {/* <FontAwesome name="hand-o-left" size={20} color="#BDBDBD" /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.userPost}>
        <Image
          source={{ uri: post.avatar }}
          style={{ width: 40, height: 40, borderRadius: 5, marginBottom: 5 }}
        />
        <Text style={{ color: '#007aff', fontSize: 15, fontWeight: 500 }}>{post.nickName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#007aff',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  userPost: {
    width: '90%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    borderColor: '#007aff',
    padding: 5,
    borderRadius: 6,
    flexDirection: 'row',
  },
});
