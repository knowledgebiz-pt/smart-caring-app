import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import { Keyboard } from 'react-native'
import { useTranslation } from "react-i18next"
import { UserService } from '@knowledgebiz/smart-caring-client/client'
import Toast from 'react-native-toast-message'

export default function RecoverPasswordCode({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)

    const [code1, setCode1] = useState("")
    const [code2, setCode2] = useState("")
    const [code3, setCode3] = useState("")
    const [code4, setCode4] = useState("")

    const input1 = useRef(null)
    const input2 = useRef(null)
    const input3 = useRef(null)
    const input4 = useRef(null)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const { t, i18n } = useTranslation()

    useEffect(() => {
        console.log('OPEN', RecoverPasswordCode.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', RecoverPasswordCode.name, 'CLOSE')
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
    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, { flex: 1 }]} onTouchStart={() => Keyboard.dismiss()}>
                    <View style={[styleSelected.imageContainer, { height: "50%", marginTop: 40, backgroundColor: "transparent" }]}>
                        <Image source={require("../../assets/images/EnterCode.png")}
                            resizeMode='cover'
                            style={{ height: 450, width: 353, alignSelf: "center" }} />
                    </View>
                    <View style={{ justifyContent: "space-evenly", alignItems: "center", height: 100 }}>
                        <Text style={styleSelected.textBold20DarkBlue}>{t("enter_code")}</Text>
                        <Text style={[styleSelected.textRegular14Gray, { textAlign: "center", width: "60%" }]}>{t("enter_code_subtext")}</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(28, 163, 252, 0.1)',
                        height: "25%",
                        width: "90%",
                        alignSelf: "center",
                        borderRadius: 20,
                        justifyContent: "center",
                        marginTop: 20
                    }}>
                        <View style={{ height: 70, marginTop: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
                            <View onTouchEnd={() => { input1.current.focus() }} style={{ backgroundColor: colors.BaseSlot1, width: 55, height: 55, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                <TextInput value={code1} keyboardType='numeric' maxLength={1} style={{ fontSize: 24 }} ref={input1} returnKeyType='next' onChangeText={(value) => {
                                    setCode1(value)
                                    if (value.length == 1)
                                        input2.current.focus()
                                }} />
                            </View>
                            <View onTouchEnd={() => { input1.current.focus() }} style={{ backgroundColor: colors.BaseSlot1, width: 55, height: 55, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                <TextInput value={code2} keyboardType='numeric' maxLength={1} style={{ fontSize: 24 }} ref={input2} returnKeyType='next' onChangeText={(value) => {
                                    setCode2(value)
                                    if (value.length == 1)
                                        input3.current.focus()
                                }} />
                            </View>
                            <View onTouchEnd={() => { input1.current.focus() }} style={{ backgroundColor: colors.BaseSlot1, width: 55, height: 55, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                <TextInput value={code3} keyboardType='numeric' maxLength={1} style={{ fontSize: 24 }} ref={input3} returnKeyType='next' onChangeText={(value) => {
                                    setCode3(value)
                                    if (value.length == 1)
                                        input4.current.focus()
                                }} />
                            </View>
                            <View onTouchEnd={() => { input1.current.focus() }} style={{ backgroundColor: colors.BaseSlot1, width: 55, height: 55, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                <TextInput value={code4} keyboardType='numeric' maxLength={1} style={{ fontSize: 24 }} ref={input4} returnKeyType='next' onChangeText={(value) => {
                                    setCode4(value)
                                    if (value.length == 1)
                                        Keyboard.dismiss()
                                }} />
                            </View>
                        </View>
                        <ButtonPrimary title={t("enter_code_verify")} event={() => {
                            console.log(route.params.email)
                            console.log(code1)
                            console.log(code2)
                            console.log(code3)
                            console.log(code4)
                            UserService.verifiesRecoveryCode(route.params.email, code1 + code2 + code3 + code4).then((response) => {
                                navigation.navigate("EnterNewPassword", {email: route.params.email})
                                console.log(response.data)
                            }).catch((error) => {
                                Toast.show({
                                    type: "error",
                                    position: 'bottom',
                                    text1: t("title_error_recovery_password"),
                                    text2: t("message_error_recovery_password"),
                                    visibilityTime: 4000,
                                    autoHide: true,
                                    bottomOffset: 40,
                                })
                            })
                        }} />
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <Text style={[styleSelected.textRegular16, { color: colors.BaseSlot3 }]}>{t("enter_code_not_received")}</Text>
                            <Text style={[styleSelected.textBold16, { color: colors.BaseSlot3 }]}>{t("enter_code_resend")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}