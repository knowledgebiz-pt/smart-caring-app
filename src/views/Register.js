import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, KeyboardAvoidingView, StatusBar, ScrollView, Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import InputTransparent from '../components/InputTransparent'

export default function Register({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')

    const ref_input2 = useRef()
    const ref_input3 = useRef()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        console.log('OPEN', Register.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            console.log('SCREEN', Register.name, 'CLOSE')
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
        <SafeAreaView style={[styleSelected.backgroundPrimary, styleSelected.AndroidSafeArea, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 0}
            >
                {/* <KeyboardAwareScrollView style={{flex:1}}> */}
                <ScrollView style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
                    <View style={styleSelected.verySmallImageContainer}>

                    </View>
                    {/* <View style={{flex:1}}> */}
                    <Text style={[styleSelected.textBold20DarkBlue, { marginTop: 45, textAlign: "center" }]}>Create an account</Text>
                    <Text style={[styleSelected.textRegular14Gray, { width: "65%", marginTop: 5, textAlign: "center", alignSelf: "center" }]}>Let's get started!</Text>

                    {/* </View> */}
                    <View style={styleSelected.paleBlueContainerTaller}>
                        <InputTransparent onChangeText={(text) => setEmail(text)} inputMode='email' blurOnSubmit={false} isPassword={true} onSubmitEditing={() => ref_input2.current?.focus()} returnKeyType='next' placeholderText={"Enter your e-mail"} />
                        <InputTransparent onChangeText={(text) => setPassword(text)} inputRef={ref_input2} blurOnSubmit={false} isPassword={true} onSubmitEditing={() => ref_input3.current?.focus()} returnKeyType='next' placeholderText={"Enter your password"} />
                        <InputTransparent onChangeText={(text) => setConfirmPassword(text)} inputRef={ref_input3} isPassword={true} placeholderText={"Confirm your password"} />
                        <Text style={[styleSelected.textDisclaimer, { width: "65%", marginTop: 5, alignSelf: "center" }]}>By clicking Continue, you agree to our <Text style={styleSelected.textBold}>Terms and Conditions</Text> and <Text style={styleSelected.textBold}>Privacy Statement</Text>.</Text>

                        <ButtonPrimary title={"Continue"} />
                    </View>
                </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}