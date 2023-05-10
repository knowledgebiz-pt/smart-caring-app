import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/views/Login';
import Register from './src/views/Register';
import RecoverPassword from './src/views/RecoverPassword';
import { MyDrawer } from './src/components/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<MyDrawer>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="RecoverPassword" component={RecoverPassword}/>
        </Stack.Navigator>
      </NavigationContainer>
    // </MyDrawer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
