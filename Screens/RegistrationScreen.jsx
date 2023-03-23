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
  ImageBackground,
  ScrollView,
} from 'react-native';

// const LoadFont = async () => {
//   await Font.loadAsync({
//     AlkatraVariableFont: require('../assets/fonts/AlkatraVariableFont.ttf'),
//   });
// };

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);

  // const [fontIsReady, setFontIsReady] = useState(false);

  // haksdhjkah

  const nameHandler = text => setName(text);
  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log('Введено', `${name} + ${email} + ${password}`);
    navigation.navigate('PostScreen');
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
      <ImageBackground style={styles.image} source={require('../assets/images/bgImage.jpg')}>
        <View style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Регистрация</Text>
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
                value={email}
                onChangeText={emailHandler}
                placeholder="E-mail"
                style={{ ...styles.input, borderColor: focusedEmail ? '#430fdf' : '#0fb5df' }}
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
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
  image: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%' },

  form: {
    paddingVertical: 40,
    // paddingTop: 32,
    // paddingBottom: 100,
    paddingHorizontal: 30,
    width: '100%',
    flex: 0.65,
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
    // textAlign: 'center',
    color: '#01050a',
    fontFamily: 'MerriweatherRegular',
  },

  noAccRegisterTxt: {
    fontSize: 16,
    color: '#1061c5',
    fontFamily: 'MerriweatherRegular',
    textDecorationLine: 'underline',
    // textDecorationLine: 'underline',
    // textAlign: 'center',
    // fontFamily: 'MerriweatherRegular',
  },
});
