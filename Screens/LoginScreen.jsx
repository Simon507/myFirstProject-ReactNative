import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState();

  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };
  const stylesForInput = {
    style: focused ? styles.inputOnFocus : styles.inputOnBlur,
  };

  const onLogin = () => {
    console.log('Введено', `${name} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.loginBlock}>
        <Text style={styles.title}>Войти</Text>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Username"
            {...stylesForInput}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginBlock: {
    paddingTop: 32,
    paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    flex: 0.5,
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    marginBottom: 33,
  },

  inputOnFocus: {
    // marginHorizontal: 20,
    // fontSize: 20,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: '#430fdf',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
  },
  inputOnBlur: {
    marginHorizontal: 20,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0fb5df',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#FF6C00',
    marginTop: 40,
    marginBottom: 16,
    borderRadius: 100,
    alignItems: 'center',

    padding: 10,
  },

  buttonTxt: { color: '#fff' },
  noAccTxt: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
