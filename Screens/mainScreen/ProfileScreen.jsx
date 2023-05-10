import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { collection, query, where, getFirestore, getDocs } from 'firebase/firestore';
import initialApp from '../../fireBase/config';
import { UserPosts } from '../../assets/components/UserPost';

import { Text, View, StyleSheet, ImageBackground, FlatList } from 'react-native';

const db = getFirestore(initialApp);

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId, photoURL, nickName } = useSelector(state => state.autorisation);

  const getUserPosts = async () => {
    const q = query(collection(db, 'usersPosts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const userPost = [];
    querySnapshot.forEach(doc => {
      userPost.push({ ...doc.data(), id: doc.id });
    });
    setUserPosts(userPost);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
    }, [])
  );

  return (
    <ImageBackground style={styles.image} source={require('../../assets/images/bgImage.jpg')}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={{ color: '#007aff', fontSize: 30, fontWeight: 500 }}>{nickName}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <UserPosts post={item} />}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  container: {
    width: '100%',
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  userContainer: {
    width: '100%',
    flex: 0.75,
    backgroundColor: '#edf7fa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default ProfileScreen;
