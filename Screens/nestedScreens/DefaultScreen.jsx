import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import initialApp from '../../fireBase/config';
import { Posts } from '../../assets/components/Post';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

import { exitDb } from '../../redux/autorisation/authOperations';

const db = getFirestore(initialApp);

const PostScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const value = useSelector(state => state.autorisation);
  const dispatch = useDispatch();

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, 'usersPosts'));
    const newPosts = [];
    querySnapshot.forEach(item => {
      newPosts.push({ ...item.data(), id: item.id });
    });
    setPosts(newPosts);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllPost();
    }, [route])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 17, fontWeight: 700 }}> Привет, {value.nickName} </Text>
        <Button
          style={styles.exitButton}
          title="ВЫХОД"
          onPress={() => {
            dispatch(exitDb());
          }}
        ></Button>
      </View>

      <FlatList
        data={posts}
        extraData={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Posts post={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#edf7fa',
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingRight: 20,
    paddingLeft: 20,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PostScreen;
