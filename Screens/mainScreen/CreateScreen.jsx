import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import CameraComponent from '../../assets/components/Camera';
import Locations from '../../assets/components/Locations';
import { EvilIcons, Feather } from '@expo/vector-icons';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

import initialApp from '../../fireBase/config';
const storage = getStorage(initialApp);
const db = getFirestore(initialApp);

const CreateScreen = ({ navigation }) => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({ timestamp: Date.now() });
  const [locationOpen, setLocationOpen] = useState(false);
  const [lablePhoto, setLablePhoto] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const { userId, nickName } = useSelector(state => state.autorisation);

  const onPhotoMake = target => {
    setPhoto(target);
    setCameraOpen(false);
  };

  const onLocationMake = target => {
    setLocation(target);
  };

  const nameHandler = text => setLablePhoto(text);

  const getAvatar = async () => {
    const querySnapshot = await getDocs(collection(db, `usersPosts/avatars/${nickName}`));
    const allAvatars = [];
    querySnapshot.forEach(item => {
      allAvatars.push({ ...item.data(), id: item.id });
    });
    setAvatar(allAvatars[0].photo);
    // setPosts(newPosts);
  };

  const getPhotoToUpload = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    // console.log(storage);

    const storageRef = ref(storage, `usersPosts/images/${uniquePostId}.jpg`);

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
      const docRef = await addDoc(collection(db, 'usersPosts'), {
        userId,
        nickName,
        lablePhoto,
        photo,
        avatar,
        location,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAvatar();
      console.log(nickName);
      console.log(avatar);
      setCameraOpen(false);
      setPhoto(null);
      setLocationOpen(false);
      setLablePhoto('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>Создание нового поста</Text>
      </View>

      <View style={cameraOpen ? styles.cameraContainerOpen : styles.cameraContainer}>
        <TouchableOpacity
          style={cameraOpen ? styles.cameraButtonOff : styles.cameraButton}
          onPress={() => {
            setPhoto(null);
            setCameraOpen(false);
            setCameraOpen(true);
          }}
        >
          <EvilIcons name="camera" size={60} color="#969090" />
        </TouchableOpacity>
        {cameraOpen && <CameraComponent onPhotoMake={onPhotoMake}></CameraComponent>}
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: '#fff' }}
          />
        )}
      </View>

      <View style={styles.nameContainer}>
        <Text>Введите название фото</Text>
        <TextInput
          value={lablePhoto}
          onChangeText={nameHandler}
          placeholder="Название фото"
          onFocus={() => setFocusedName(true)}
          onBlur={() => setFocusedName(false)}
          style={{ ...styles.input, borderColor: focusedName ? '#430fdf' : '#0fb5df' }}
        />
      </View>
      <View style={styles.locationContainer}>
        <Text>Место создания фото</Text>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => {
            setLocationOpen(false);
            setLocationOpen(true);
          }}
        >
          <Feather name="map-pin" size={50} color="#969090" />
        </TouchableOpacity>
        {locationOpen && <Locations onLocationMake={onLocationMake}></Locations>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getPhotoToUpload();
        }}
      >
        <Text style={styles.buttonTxt}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical: 50 },
  headerTitle: { fontSize: 30, fontStyle: 'italic' },
  // createButton: {
  //   backgroundColor: '#FF6C00',
  //   marginTop: 20,
  //   marginBottom: 40,
  //   borderRadius: 100,
  //   alignItems: 'center',
  //   padding: 10,
  // },
  // backButton: {
  //   backgroundColor: '#FF6C00',
  //   marginTop: 20,
  //   marginBottom: 40,
  //   borderRadius: 100,
  //   alignItems: 'center',
  //   padding: 10,
  // },
  cameraContainer: {
    borderWidth: 1,
    borderColor: '000',
    borderRadius: 20,
    width: '90%',
    height: '30%',
    // alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraContainerOpen: {
    borderWidth: 1,
    borderColor: '000',
    borderRadius: 20,
    width: '90%',
    height: '70%',
    // alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraButton: {
    position: 'absolute',
    zIndex: 300,
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: '#969090',
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButtonOff: {
    display: 'none',
  },
  nameContainer: {
    borderWidth: 1,
    borderColor: '000',
    borderRadius: 20,
    width: '90%',
    padding: 20,
  },
  input: {
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,

    fontFamily: 'MerriweatherRegular',
    marginHorizontal: 5,
  },
  locationContainer: {
    zIndex: 9000,
    padding: 10,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '000',
    borderRadius: 20,
    width: '90%',
    height: '25%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  mapButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 500,
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: '#969090',
    borderRadius: 50,
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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

export default CreateScreen;
