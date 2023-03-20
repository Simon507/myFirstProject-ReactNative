import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <ImageBackground source={require('./Images/bgImage.jpg')} style={styles.image}>
        <LoginScreen> </LoginScreen>
        {/* <Text>Hello, is MY first project = TEST GIT 399996</Text> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
});
