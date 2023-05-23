import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/views/Login';
import Register from './src/views/Register';
import RecoverPassword from './src/views/RecoverPassword';
import { MyDrawer } from './src/components/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstAccess from './src/views/FirstAccess';
import EnterNewPassword from './src/views/EnterNewPassword';
import SuccessNewPassword from './src/views/SuccessNewPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<MyDrawer>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SuccessNewPassword'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="FirstAccess" component={FirstAccess} />
        <Stack.Screen name="EnterNewPassword" component={EnterNewPassword} />
        <Stack.Screen name="SuccessNewPassword" component={SuccessNewPassword} />

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
