import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Alert, SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import InputTransparent from '../components/InputTransparent'
import ButtonPrimary from '../components/ButtonPrimary'
import { OpenAPI, UserService } from "smart-caring-client/client"
import * as LocalAuthentication from "expo-local-authentication";
import * as Google from "expo-auth-session/providers/google";
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import * as AppleAuthentication from "expo-apple-authentication"
import * as jwtDecode from "jwt-decode"

import { useTranslation } from "react-i18next"

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

    const { t, i18n } = useTranslation()

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
            UserService.getAllUsers().then((res) => {
                console.log(res.data)
                const checkUser = res.data.find((user) => user.email == data.email)
                if (checkUser) {
                    AsyncStorage.setItem("@token", checkUser._id.$oid)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'BottomTab', params: { userData: checkUser } }],
                        })
                    )
                } else {
                    console.warn(data)
                    navigation.navigate('CreateAccountWithGmail', { userInfo: data })
                }
            }).catch((err) => { })
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
    const showToast = (msg, type = "success") => {
        // Types: success, error, info
        Toast.show({ type: type, text1: msg, position: 'bottom', props: { text1NumberOfLines: 2 } })
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
                        {/* <Text style={styleSelected.textBold20DarkBlue}>Welcome back</Text> */}
                        <Text style={styleSelected.textBold20DarkBlue}>{t("login_welcome")}</Text>
                        <Text style={styleSelected.textRegular14Gray}>{t("login_subtext")}</Text>
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
                                placeholder={t("login_enter_email")}
                                onChangeText={(value) => {
                                    setEmail(value)
                                }} />
                        </View>
                        <View style={{ height: 70 }}>
                            <InputTransparent
                                placeholder={t("login_password")}
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    setPassword(value)
                                }} />
                        </View>
                        <TouchableOpacity style={{ height: 30 }} onPress={() => { navigation.navigate("RecoverPassword") }}>
                            <Text style={[{ alignSelf: "flex-end", textDecorationLine: "underline", color: colors.BaseSlot3, fontWeight: 500, marginRight: 50 }, styleSelected.text12Regular]}>{t("login_forgot_password")}</Text>
                        </TouchableOpacity>
                        <ButtonPrimary title={t("login")} event={() => {
                            console.log("email: ", email)
                            console.log("password: ", password)
                            if (email.length && password.length) {
                                setIsLoading(false)
                                UserService.getUserDataByIdUser(email.toLowerCase(), password).then(response => {
                                    setIsLoading(true)
                                    console.warn(response.data)
                                    AsyncStorage.setItem("@token", response.data._id.$oid)
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{ name: 'BottomTab', params: { userData: response.data } }],
                                        })
                                    )
                                    // navigation.navigate("BottomTab", { userData: response.data })
                                }).catch((error) => {
                                    console.error(error)
                                    setIsLoading(true)
                                    setPassword("")
                                    setEmail("")
                                    showToast(t("login_toast_fail"), "error")
                                })
                            }
                            else {
                                showToast(t("login_toast_missing_fields"), "error")
                            }
                        }} />
                        <View style={{ flexDirection: "row", height: 50, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: colors.BaseSlot5, flex: 1 }} />
                            <Text style={[{ marginLeft: 15, marginRight: 15 }, styleSelected.text12Regular]}>{t("login_or")}</Text>
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
                            <AppleAuthentication.AppleAuthenticationButton style={{ width: 150, justifyContent: "center", alignItems: "center" }}
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}                                
                                cornerRadius={30}
                                onPress={async () => {
                                    try {
                                      const credential = await AppleAuthentication.signInAsync({
                                        requestedScopes: [
                                          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                        ],
                                      }                                      
                                      ).then((data) => {
                                        let tokenData = jwtDecode.default(data.identityToken)
                                        let email = tokenData.email
                                        UserService.getAllUsers().then((res) => {
                                            console.log(res.data)
                                            const checkUser = res.data.find((user) => user.email == email)
                                            if (checkUser) {
                                                AsyncStorage.setItem("@token", checkUser._id.$oid)
                                                navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 0,
                                                        routes: [{ name: 'BottomTab', params: { userData: checkUser } }],
                                                    })
                                                )
                                            } else {
                                                console.warn(data)
                                                navigation.navigate('CreateAccountWithGmail', { userInfo: data })
                                            }
                                        }).catch((err) => { })
                                      });
                                      // signed in
                                    } catch (e) {
                                      if (e.code === 'ERR_REQUEST_CANCELED') {
                                        // handle that the user canceled the sign-in flow
                                      } else {
                                        // handle other errors
                                      }
                                    }
                                  }}
                             />
                            {/* <TouchableOpacity style={{ backgroundColor: colors.BaseSlot1, width: 150, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../assets/images/facebook.png")} style={{ height: 35, width: 35 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }} onPress={() => { navigation.navigate("Register") }}>
                            <Text style={[styleSelected.textRegular16, { color: colors.BaseSlot3 }]}>{t("login_no_account")}</Text>
                            <Text style={[styleSelected.textBold16, { color: colors.BaseSlot3 }]}>{t("login_sign_up")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}