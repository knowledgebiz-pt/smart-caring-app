import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, Image, TextInput, TouchableOpacity, Pressable, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { RecoverUserPassword } from '../services/LoginService'

export default function RecoverPassword({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState("")
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', RecoverPassword.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            console.log('SCREEN', RecoverPassword.name, 'CLOSE')
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
    if (isLoading) {
        return (
            <Loader />
        );
    }
    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1}}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={styleSelected.container}>
                    <Image style={styleSelected.image} source={require("../../assets/images/logo.png")} />
                    <StatusBar style="auto" />
                    <Text style={styleSelected.option_buttons}>Please insert your email.</Text>
                    <View style={styleSelected.inputView}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styleSelected.return_login_button}>Go back to login</Text>
                    </TouchableOpacity>
                    <Pressable onPressOut={() => RecoverUserPassword(email)} style={({ pressed }) => pressed ? styleSelected.pressedLoginBtn : styleSelected.loginBtn}>
                        <Text style={styleSelected.loginText}>RECOVER PASSWORD</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}