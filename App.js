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
import SplashScreen from './src/views/SplashScreen';
import Profile from './src/views/Profile';
import { OpenAPI } from '@knowledgebiz/smart-caring-client/client';
import store from "./src/redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"
import CreateChat from './src/views/CreateChat';
import PolicyPrivacy from './src/views/PolicyPrivacy';

const Stack = createNativeStackNavigator();

// OpenAPI.BASE = "http://192.168.1.82:8000"

export default function App() {
  const { t, i18n } = useTranslation()

  return (
    //<MyDrawer>
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
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
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="ChatSender" component={ChatSender} options={
              {
                headerShown: true,
                headerTitle: 'Chat',
              }
            } />
            <Stack.Screen name="CreateEvent" component={CreateEvent} options={{
              headerShown: true,
              headerTitle: t("schedule_create_event"),
            }} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="CreateChat" component={CreateChat} />
            <Stack.Screen name="PolicyPrivacy" component={PolicyPrivacy} options={{
              headerTitle: t("homepage_menu_privacy_policy"),
              headerShown: true,
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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