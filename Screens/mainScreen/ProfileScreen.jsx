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
  const [avatar, setAvatar] = useState(null);
  const { userId, nickName } = useSelector(state => state.autorisation);

  const getUserPosts = async () => {
    const q = query(collection(db, 'usersPosts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const userPost = [];
    querySnapshot.forEach(doc => {
      userPost.push({ ...doc.data(), id: doc.id });
    });
    setUserPosts(userPost);
  };

  const getAvatar = async () => {
    const querySnapshot = await getDocs(collection(db, `usersPosts/avatars/${nickName}`));

    const avatar = [];
    querySnapshot.forEach(item => {
      avatar.push({ ...item.data(), id: item.id });
    });

    if (avatar.length == 0) {
      return;
    }
    setAvatar(avatar[0].photo);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
      getAvatar();
    }, [])
  );

  return (
    <ImageBackground style={styles.image} source={require('../../assets/images/bgImage.jpg')}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={styles.userAvatar}>
            {avatar ? (
              <ImageBackground style={styles.avatarImage} source={{ uri: avatar }} />
            ) : (
              <View>
                <Text
                  style={{
                    color: '#0fb5df',
                  }}
                >
                  Аватар не загрузился...
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.avatarName}>{nickName}</Text>
          <FlatList
            data={userPosts}
            style={styles.userPostsList}
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
  avatarName: {
    fontSize: 20,
    fontWeight: 500,
    position: 'absolute',
    top: -90,
    left: '35%',
  },
  userAvatar: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    width: 125,
    height: 125,
    top: -60,
    left: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#0fb5df',
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  userContainer: {
    width: '100%',
    flex: 0.75,
    backgroundColor: '#edf7fa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userPostsList: {
    marginTop: 70,
    display: 'flex',
    gap: 15,
  },
});

export default ProfileScreen;
