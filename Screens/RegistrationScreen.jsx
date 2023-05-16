import React, { useState } from 'react';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { RegisterDb } from '../redux/autorisation/authOperations';

import { useDispatch } from 'react-redux';

import initialApp from '../fireBase/config';
const storage = getStorage(initialApp);
const db = getFirestore(initialApp);

const initialState = {
  email: '',
  password: '',
  nickName: '',
  photoURL: '',
};

export default function RegistrationScreen({ navigation }) {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [inputValue, setInputValue] = useState(initialState);
  const [image, setImage] = useState(null);

  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  // const [userPhotoUrl, setUserPhotoUrl] = useState(null);

  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);

  // const nameHandler = text => setName(text);
  // const emailHandler = text => setEmail(text);
  // const passwordHandler = text => setPassword(text);

  const dispatch = useDispatch();

  const addPhoto = async () => {
    if (!permission.granted) {
      requestStoragePermission();
    } else {
      pickImage();
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          requestPermission();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setInputValue(prevState => ({
        ...prevState,
        photoURL: result.assets[0].uri,
      }));

      setImage(result.assets[0].uri);

      //zapis on firebase
    }
  };

  ///111111111111111111111111111

  const getPhotoToUpload = async photo => {
    const response = await fetch(photo);
    const file = await response.blob();
    // const uniquePostId = Date.now().toString();
    // console.log(storage);

    const storageRef = ref(storage, `usersPosts/images/avatars/${inputValue.nickName}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '% done');
      },
      error => {
        console.log('Error uloading image:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File aviable at', downloadURL);
          writeOnDB(downloadURL);
        });
      }
    );
  };

  const writeOnDB = async photo => {
    try {
      const docRef = await addDoc(collection(db, `usersPosts/avatars/${inputValue.nickName}/`), {
        photo,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  //222222222222222222222222222

  const onSubmit = () => {
    if (!inputValue.nickName || !inputValue.email || !inputValue.password || !inputValue.photoURL) {
      return Alert.alert('Аватар и все поля обязательны к заполнению!');
    }
    getPhotoToUpload(image);
    Keyboard.dismiss();
    dispatch(RegisterDb(inputValue));
    setInputValue(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.image} source={require('../assets/images/bgImage.jpg')}>
        <View style={styles.form}>
          <View style={styles.avatarBox}>
            <TouchableOpacity onPress={addPhoto} style={styles.photoBtn}>
              {image ? (
                <ImageBackground style={styles.avatarImage} source={{ uri: image }} />
              ) : (
                <View style={styles.avatarAddBtn}>
                  <AntDesign name="pluscircleo" size={70} color="#0fb5df" />
                  <Text
                    style={{
                      color: '#0fb5df',
                    }}
                  >
                    Добавить аватар
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={styles.title}>Регистрация</Text>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <TextInput
                value={inputValue.nickName}
                onChangeText={value =>
                  setInputValue(prevState => ({
                    ...prevState,
                    nickName: value,
                  }))
                }
                placeholder="Username"
                style={{ ...styles.input, borderColor: focusedName ? '#430fdf' : '#0fb5df' }}
                onFocus={() => setFocusedName(true)}
                onBlur={() => setFocusedName(false)}
              />
              <TextInput
                value={inputValue.email}
                onChangeText={value =>
                  setInputValue(prevState => ({
                    ...prevState,
                    email: value,
                  }))
                }
                placeholder="E-mail"
                style={{ ...styles.input, borderColor: focusedEmail ? '#430fdf' : '#0fb5df' }}
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
              />
              <TextInput
                value={inputValue.password}
                onChangeText={value =>
                  setInputValue(prevState => ({
                    ...prevState,
                    password: value,
                  }))
                }
                placeholder="Password"
                style={{ ...styles.input, borderColor: focusedPass ? '#430fdf' : '#0fb5df' }}
                onFocus={() => setFocusedPass(true)}
                onBlur={() => setFocusedPass(false)}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonTxt}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.noAcc}>
              <Text style={styles.noAccTxt}>Уже есть аккаунт? &#8594;</Text>
              <Text
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.noAccRegisterTxt}
              >
                Войти
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },

  form: {
    paddingVertical: 70,
    paddingHorizontal: 30,
    width: '100%',
    flex: 0.65,
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },

  avatarBox: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    width: 125,
    height: 125,
    top: -60,
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#0fb5df',
    borderWidth: 1,
    overflow: 'hidden',
  },

  avatarAddBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },

  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    marginBottom: 25,
    fontFamily: 'MerriweatherRegular',
  },

  input: {
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 30,
    fontFamily: 'MerriweatherRegular',
  },

  button: {
    backgroundColor: '#FF6C00',
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 100,
    alignItems: 'center',
    padding: 10,
  },

  buttonTxt: { color: '#fff' },

  noAcc: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noAccTxt: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#01050a',
    fontFamily: 'MerriweatherRegular',
  },

  noAccRegisterTxt: {
    fontSize: 16,
    color: '#1061c5',
    fontFamily: 'MerriweatherRegular',
    textDecorationLine: 'underline',
  },
});
