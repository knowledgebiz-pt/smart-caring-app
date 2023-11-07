import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, KeyboardAvoidingView, StatusBar, ScrollView, Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import InputTransparent from '../components/InputTransparent'

import { useTranslation } from "react-i18next"

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

    const {t, i18n} = useTranslation()

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

    const testInputs = (password, email) => {
        let rePassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordResult = rePassword.test(password)
        let emailResult = reEmail.test(email)
        if (passwordResult && emailResult) {
            return {res: true}
        }
        else if (passwordResult && !emailResult) {
            return {res: false, msg: t("email_format_error")}
        }
        else if (!passwordResult && emailResult) {
            return {res: false, msg: t("password_format_error")}
        }
        else return {res: false, msg: t("register_no_fields")}
    }

    const handleSubmit = (email, password, confirmPassword) => {
        if (password === confirmPassword) {
            let shouldProceed = testInputs(password, email)
    
            if (shouldProceed.res) {
                navigation.navigate('CreateAccount', {email: email, password: password})    
            }
            else {
                alert(shouldProceed.msg)
            }
        }
        else {
            alert(t("passwords_not_match"))
        }
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
                    <View style={[styleSelected.verySmallImageContainer, {backgroundColor: "transparent"}]}>
                    <Image source={require("../../assets/images/CreateAccount.png")}
                        resizeMode='cover'
                        style={{ height: 260, width: 350, alignSelf: "center" }} />
                    </View>
                    {/* <View style={{flex:1}}> */}
                    <Text style={[styleSelected.textBold20DarkBlue, { marginTop: 45, textAlign: "center" }]}>{t("register_title")}</Text>
                    <Text style={[styleSelected.textRegular14Gray, { width: "65%", marginTop: 5, textAlign: "center", alignSelf: "center" }]}>{t("register_subtext")}</Text>

                    {/* </View> */}
                    <View style={styleSelected.paleBlueContainerTaller}>
                        <InputTransparent onChangeText={(text) => setEmail(text)} inputMode='email' blurOnSubmit={false} onSubmitEditing={() => ref_input2.current?.focus()} returnKeyType='next' placeholder={t("register_email")} />
                        <InputTransparent onChangeText={(text) => setPassword(text)} inputRef={ref_input2} blurOnSubmit={false} secureTextEntry={true} onSubmitEditing={() => ref_input3.current?.focus()} returnKeyType='next' placeholder={t("register_password")} />
                        <InputTransparent onChangeText={(text) => setConfirmPassword(text)} inputRef={ref_input3} secureTextEntry={true} placeholder={t("register_confirm_password")} />

                        <ButtonPrimary event={() => handleSubmit(email, password, confirmPassword)} title={t("register_continue")} />
                    </View>
                </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}