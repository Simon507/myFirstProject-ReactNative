import React, { useState, useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';

import initialApp from '../../fireBase/config';
const db = getFirestore(initialApp);

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CommentsScreenPosts = item => {
  const [targetPostId, setTargetPostId] = useState(null);
  const [allComents, setAllComments] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [focusedName, setFocusedName] = useState(false);

  const value = useSelector(state => state.autorisation);

  const nameHandler = text => {
    setComment(text);
  };

  const getAllComments = async target => {
    // console.log(target);
    const querySnapshot = await getDocs(collection(db, 'usersPosts', target, 'comments'));
    const comments = [];
    querySnapshot.forEach(doc => {
      comments.push({ ...doc.data() });
    });
    setAllComments(comments);
    // console.log(comments);
  };

  const addCommentById = async comment => {
    if (!comment) {
      return Alert.alert('Нельзя отправлять пустой комментарий!');
    }

    const fullComment = `"${comment}"
    .......... 
    Комментатор: ${value.nickName}`;
    try {
      const docRef = await addDoc(collection(db, 'usersPosts', targetPostId, 'comments'), {
        fullComment,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
    setComment(null);
    Keyboard.dismiss();
    getAllComments(targetPostId);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(item);

      const targetPost = item.route.params.postId;
      const photo = item.route.params.photo;

      setTargetPostId(targetPost);
      setPhoto(photo);
      getAllComments(targetPost);

      // findPost(targetPost);
    }, [])
  );

  // const from = 'PostScreen';
  // useEffect(() => {
  //   console.log(`зщыеы`);
  // }, []);

  // navigation.navigate('Cren', from);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {photo && <Image style={styles.image} source={{ uri: photo }} />}
        <View style={styles.commentsBlock}>
          {
            allComents && (
              <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.commentsList}
                data={allComents}
                renderItem={({ item }) => <Item title={item.fullComment} />}
                // keyExtractor={item => item.comment}
              />
            )

            // <FlatList
            //   data={allComents}
            //   keyExtractor={(item) => index.toString()}
            //   renderItem={({ item }) => <Posts post={item} navigation={navigation} />}
            // />
          }
        </View>

        <View style={styles.editCommentBlock}>
          <TextInput
            multiline
            value={comment}
            onChangeText={nameHandler}
            placeholder="Введите комментарий"
            onFocus={() => setFocusedName(true)}
            onBlur={() => setFocusedName(false)}
            style={{ ...styles.input, borderColor: focusedName ? '#430fdf' : '#0fb5df' }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addCommentById(comment);
          }}
        >
          <Text style={styles.buttonTxt}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edf7fa',
  },
  commentsBlock: {
    paddingTop: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: '#0fb5df',
    width: '100%',
    paddingHorizontal: 10,
  },
  commentsList: {},
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
  item: {
    // backgroundColor: '#d80bef',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0fb5df',
  },
  title: {
    fontSize: 16,
  },
  editCommentBlock: {
    // flex: 0.2,
    width: '100%',
    paddingTop: 15,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    minHeight: 50,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF6C00',
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 100,
    alignItems: 'center',
    padding: 10,
  },
  buttonTxt: { color: '#fff' },
});

export default CommentsScreenPosts;
