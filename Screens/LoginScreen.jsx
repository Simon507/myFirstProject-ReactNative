import React, { useState } from 'react';

// import { AppLoading } from 'expo';

// import * as Font from 'expo-font';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

// const LoadFont = async () => {
//   await Font.loadAsync({
//     AlkatraVariableFont: require('../assets/fonts/AlkatraVariableFont.ttf'),
//   });
// };

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);

  // const [fontIsReady, setFontIsReady] = useState(false);

  // haksdhjkah

  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    Keyboard.dismiss();
    console.log('Введено', `${name} + ${password}`);
  };

  // if (!fontIsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFont}
  //       onFinish={() => {
  //         setFontIsReady(true);
  //       }}
  //       onError={console.warn}
  //     ></AppLoading>
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <View style={styles.form}>
          <Text style={styles.title}>Войти</Text>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <TextInput
              value={name}
              onChangeText={nameHandler}
              placeholder="Username"
              style={{ ...styles.input, borderColor: focusedName ? '#430fdf' : '#0fb5df' }}
              onFocus={() => setFocusedName(true)}
              onBlur={() => setFocusedName(false)}
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Password"
              style={{ ...styles.input, borderColor: focusedPass ? '#430fdf' : '#0fb5df' }}
              onFocus={() => setFocusedPass(true)}
              onBlur={() => setFocusedPass(false)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonTxt}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Text style={styles.noAccTxt}>Нет аккаунта? Зарегистрироваться</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%' },

  form: {
    paddingTop: 32,
    paddingBottom: 144,
    paddingHorizontal: 30,
    width: '100%',
    flex: 0.42,
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
    marginBottom: 40,
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
    marginBottom: 40,
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
    fontFamily: 'MerriweatherRegular',
  },
  noAccTxt: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'MerriweatherRegular',
  },
});
