import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import CheckBox from 'expo-checkbox'
import { LoginUser } from '../services/LoginService'

export default function Login({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {
        console.log('OPEN', Login.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false) 
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
                    <View style={styleSelected.inputView}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styleSelected.inputView}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <View style={styleSelected.checkboxView}>
                        <CheckBox disabled={false} value={toggleCheckBox}
                        onValueChange={(newVal) => setToggleCheckBox(newVal)}/><Text onPress={() => setToggleCheckBox(!toggleCheckBox)}> Remember me</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
                        <Text style={styleSelected.option_buttons}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styleSelected.option_buttons}>Create a new account</Text>
                    </TouchableOpacity>
                    <Pressable onPressOut={() => LoginUser(email, password).then(res => {console.log(res)}).catch(e => {console.error(e)})} style={({ pressed }) => pressed ? styleSelected.pressedLoginBtn : styleSelected.loginBtn}>
                        <Text style={styleSelected.loginText}>LOGIN</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}