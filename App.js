// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/images/bgImage.jpg')}>
        <LoginScreen> </LoginScreen>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%' },
});
