import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import CameraComponent from '../../assets/components/Camera';

const CreateScreen = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [focusedName, setFocusedName] = useState(false);

  const onPhotoMake = target => {
    console.log(target);
    setPhoto(target);
  };
  const nameHandler = text => setName(text);

  return (
    <View style={styles.container}>
      {/* <Camera></Camera> */}

      <View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonTxt}>Кнопка создать</Text>
        </TouchableOpacity>
        <Text>Header place</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonTxt}>Кнопка назад</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => {
            setCameraOpen(false);
            setCameraOpen(true);
          }}
        >
          <Text style={styles.buttonTxt}>Кнопка камеры</Text>
        </TouchableOpacity>
        {cameraOpen && <CameraComponent onPhotoMake={onPhotoMake}></CameraComponent>}
      </View>
      <View style={styles.cameraContainer}>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ width: 150, height: 150, borderWidth: 1, borderColor: '#fff' }}
          />
        )}
      </View>

      <View>
        <TextInput
          value={name}
          onChangeText={nameHandler}
          placeholder="Username"
          style={{ ...styles.input, borderColor: focusedName ? '#430fdf' : '#0fb5df' }}
          onFocus={() => setFocusedName(true)}
          onBlur={() => setFocusedName(false)}
        />
      </View>
      <View>
        <Text>Geoposition place</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonTxt}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cameraContainer: {
    borderWidth: 1,
    borderColor: '000',
    borderRadius: 20,
    width: '90%',
    height: '30%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#f00',
    borderRadius: 50,
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
    marginBottom: 40,
    borderRadius: 100,
    alignItems: 'center',
    padding: 10,
  },
  buttonTxt: { color: '#fff' },
});

export default CreateScreen;
