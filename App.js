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
import CreateAccount from './src/views/CreateAccount';
import Features from './src/views/Features';
import RecoverPasswordCode from './src/views/RecoverPasswordCode';
import CreateAccountWithGmail from './src/views/CreateAccountWithGmail';
import HomePage from './src/views/HomePage';
import { BottomTab } from './src/components/BottomTab';
import Toast from 'react-native-toast-message';
import ChatSender from './src/views/ChatSender';
import CreateEvent from './src/views/CreateEvent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<MyDrawer>
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="RecoverPasswordCode" component={RecoverPasswordCode} />
          <Stack.Screen name="FirstAccess" component={FirstAccess} />
          <Stack.Screen name="EnterNewPassword" component={EnterNewPassword} />
          <Stack.Screen name="SuccessNewPassword" component={SuccessNewPassword} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="CreateAccountWithGmail" component={CreateAccountWithGmail} />
          <Stack.Screen name="Features" component={Features} />
          <Stack.Screen name="HomePage" component={HomePage}/>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="ChatSender" component={ChatSender} options={
            {
              headerShown: true,
              headerTitle: 'Chat',
            }
          }/>
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
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


// IOS 870460584280-reph3naspthqbhr8rn7lq9e8mkj2fl7h.apps.googleusercontent.com

// WEB
//CLIENT ID 870460584280-rscdtdn9l306hahc1o6fggajiqje5s1t.apps.googleusercontent.com
//CLIENT SECRET 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