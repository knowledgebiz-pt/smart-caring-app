import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Alert,SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import InputTransparent from '../components/InputTransparent'
import ButtonPrimary from '../components/ButtonPrimary'
import { UserService } from "smart-caring-client/client"
import * as LocalAuthentication from "expo-local-authentication";
import * as Google from "expo-auth-session/providers/google";
import Toast from 'react-native-toast-message'

export default function Login({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [request, response, prompAsync] = Google.useAuthRequest({
        androidClientId:
            "181932543433-gbl0846u9a7qa5fo72ik1o1kumkc7p0q.apps.googleusercontent.com",
        iosClientId:
            "870460584280-reph3naspthqbhr8rn7lq9e8mkj2fl7h.apps.googleusercontent.com",
        expoClientId:
            "870460584280-rscdtdn9l306hahc1o6fggajiqje5s1t.apps.googleusercontent.com",
    });

    useEffect(() => {
        console.log("INFO LOGIN");
        console.log(response);
        if (response?.type === "success") {
            accessToken = response.authentication.accessToken;
            GetUserData();
        }
        if (response?.type === "error") {
            Alert.alert("Error", response.error?.message);
        }
        if (response?.type === "locked") {
            Alert.alert("Locked", "LOCKED");
        }
        setIsLoading(true)
    }, [response]);

    async function GetUserData() {
        let userInfoResponse = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        userInfoResponse.json().then((data) => {
            console.warn(data)
            navigation.navigate('CreateAccountWithGmail', { userInfo: data })
        });
    }

    useEffect(() => {
        console.log('OPEN', Login.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', Login.name, 'CLOSE')
        }
    }, [])
    Appearance.getColorScheme()
    Appearance.addChangeListener(({ colorScheme }) => {
        console.log('COLOR THEME WAS ALTER')
        console.log(colorScheme)
        if (Platform.OS === 'android')
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.BaseSlot1 : colors.BaseSlot1)
    })
    const onLayoutRootView = useCallback(async () => {
        if (isLoading) {
        }
    }, [isLoading]);
    if (!isLoading) {
        return (
            <Loader />
        );
    }
    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
                    <Image source={require("../../assets/images/logo.png")} style={{ width: 200, height: 200, alignSelf: "center" }} resizeMode='contain' />
                    <View style={{ height: 80, justifyContent: "space-evenly", alignItems: "center" }}>
                        <Text style={styleSelected.textBold20DarkBlue}>Welcome back</Text>
                        <Text style={styleSelected.textRegular14Gray}>Let’s log in and continue helping others!</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(28, 163, 252, 0.1)',
                        height: "55%",
                        width: "90%",
                        alignSelf: "center",
                        borderRadius: 20,
                        justifyContent: "center"
                    }}>
                        <View style={{ height: 70, marginTop: 20 }}>
                            <InputTransparent
                                placeholder={"Enter e-mail"}
                                onChangeText={(value) => {
                                    setEmail(value)
                                }} />
                        </View>
                        <View style={{ height: 70 }}>
                            <InputTransparent
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    setPassword(value)
                                }} />
                        </View>
                        <TouchableOpacity style={{ height: 30 }} onPress={() => { navigation.navigate("RecoverPassword") }}>
                            <Text style={[{ alignSelf: "flex-end", textDecorationLine: "underline", color: colors.BaseSlot3, fontWeight: 500, marginRight: 50 }, styleSelected.text12Regular]}>Forgot Password</Text>
                        </TouchableOpacity>
                        <ButtonPrimary title={"Login"} event={() => {
                            setIsLoading(false)
                            UserService.getUserDataByIdUser(email, password).then(response => {
                                setIsLoading(true)
                                console.warn(response.data)
                                navigation.navigate("BottomTab", { userData: response.data })
                            }).catch((error) => {
                                console.error(error)
                                setIsLoading(true)
                                showToast("Error: failed to login.", "error")
                            })
                        }} />
                        <View style={{ flexDirection: "row", height: 50, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: colors.BaseSlot5, flex: 1 }} />
                            <Text style={[{ marginLeft: 15, marginRight: 15 }, styleSelected.text12Regular]}>or</Text>
                            <View style={{ height: 1, backgroundColor: colors.BaseSlot5, flex: 1 }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsLoading(false)
                                    prompAsync();
                                }}
                                style={{ backgroundColor: colors.BaseSlot1, width: 150, borderRadius: 30, justifyContent: "center", alignItems: "center", height: 50 }}>
                                <Image source={require("../../assets/images/google.png")} style={{ height: 35, width: 35 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: colors.BaseSlot1, width: 150, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../assets/images/facebook.png")} style={{ height: 35, width: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }} onPress={() => { navigation.navigate("Register") }}>
                            <Text style={[styleSelected.textRegular16, { color: colors.BaseSlot3 }]}>Don’t have an account? </Text>
                            <Text style={[styleSelected.textBold16, { color: colors.BaseSlot3 }]}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}