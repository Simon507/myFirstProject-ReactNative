import React, { useState } from 'react';

import { enterDb } from '../redux/autorisation/authOperations';

import { useDispatch } from 'react-redux';

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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);

  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);

  const dispatch = useDispatch();

  const onLogin = () => {
    Keyboard.dismiss();
    dispatch(enterDb(email, password));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.image} source={require('../assets/images/bgImage.jpg')}>
        <View style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Вход в приложение</Text>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Email"
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
              <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.buttonTxt}>ВХОД</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.noAcc}>
              <Text style={styles.noAccTxt}>Нет аккаунта? &#8594;</Text>
              <Text
                onPress={() => navigation.navigate('RegistrationScreen')}
                style={styles.noAccRegisterTxt}
              >
                Зарегистрироваться
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
    paddingHorizontal: 30,
    width: '100%',
    flex: 0.6,
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
    gap: 5,
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
