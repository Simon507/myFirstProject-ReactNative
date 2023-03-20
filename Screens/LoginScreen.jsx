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
} from 'react-native';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    console.log('Credentials', `${name} + ${password}`);
  };

  return (
    <View style={styles.mainBlock}>
      <View style={styles.enterBlock}>
        <Text style={styles.title}>Войти</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                style={styles.input}
              />

              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonTxt}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.noAccTxt}>Нет аккаунта? Зарегистрироваться</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingBottom: 30,
  },
  //   enterFieldBlock: { width: '100%' },
  //   enterFieldBlock1: { width: '100%' },

  container: { width: '100%' },

  enterBlock: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    // position: 'absolute',
    flex: 0.6,
    // top: 320,
    // left: 0,
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // justifyContent: 'center',
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
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF6C00',

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
