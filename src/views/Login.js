import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import InputTransparent from '../components/InputTransparent'
import ButtonPrimary from '../components/ButtonPrimary'

export default function Login({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

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
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.Base_Slot_1 : colors.Base_Slot_1)
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
                        <View style={{height: 70, marginTop: 20}}>
                            <InputTransparent placeholderText={"Enter e-mail"} />
                        </View>
                        <View style={{height: 70}}>
                            <InputTransparent placeholderText={"password"} />
                        </View>
                        <TouchableOpacity style={{height: 30}}>
                            <Text style={[{ alignSelf: "flex-end", textDecorationLine: "underline", color: colors.Base_Slot_3, fontWeight: 500, marginRight: 50 }, styleSelected.text12Regular]}>Forgot Password</Text>
                        </TouchableOpacity>
                        <ButtonPrimary title={"Login"} />
                        <View style={{ flexDirection: "row", height: 50, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ height: 1, backgroundColor: colors.Base_Slot_5, flex: 1 }} />
                            <Text style={[{ marginLeft: 15, marginRight: 15 }, styleSelected.text12Regular]}>or</Text>
                            <View style={{ height: 1, backgroundColor: colors.Base_Slot_5, flex: 1 }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <TouchableOpacity style={{ backgroundColor: colors.Base_Slot_1, width: 150, borderRadius: 30, justifyContent: "center", alignItems: "center", height: 50 }}>
                                <Image source={require("../../assets/images/google.png")} style={{ height: 35, width: 35 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: colors.Base_Slot_1, width: 150, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../assets/images/facebook.png")} style={{ height: 35, width: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <Text style={[styleSelected.textRegular16, { color: colors.Base_Slot_3 }]}>Don’t have an account? </Text>
                            <Text style={[styleSelected.textBold16, { color: colors.Base_Slot_3 }]}>Sign up</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}