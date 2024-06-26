import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, Image, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import InputTransparent from '../components/InputTransparent'
import ButtonPrimary from '../components/ButtonPrimary'
import { useTranslation } from "react-i18next"
import { UserService } from '@knowledgebiz/smart-caring-client/client'
import Toast from 'react-native-toast-message'


export default function RecoverPassword({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const { t, i18n } = useTranslation()

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
                style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -100 : -100}
            >
                <View style={[styleSelected.imageContainer, { height: "50%", marginTop: 40, backgroundColor: "transparent" }]}>
                    <Image source={require("../../assets/images/ForgotPassword.png")}
                        resizeMode='cover'
                        style={{ height: 450, width: 353, alignSelf: "center" }} />
                </View>
                <View style={{ justifyContent: "space-evenly", alignItems: "center", height: 100 }}>
                    <Text style={styleSelected.textBold20DarkBlue}>{t("forgot_password")}</Text>
                    <Text style={[styleSelected.textRegular14Gray, { textAlign: "center", width: "60%" }]}>{t("forgot_password_subtext")}</Text>
                </View>
                <View style={{
                    backgroundColor: 'rgba(28, 163, 252, 0.1)',
                    height: "25%",
                    width: "90%",
                    alignSelf: "center",
                    borderRadius: 20,
                    justifyContent: "center"
                }}>
                    <View style={{ height: 70, marginTop: 20 }}>
                        <InputTransparent placeholder={t("forgot_password_input")} value={email} setValue={setEmail} />
                    </View>
                    <ButtonPrimary title={t("forgot_password_send_code")} event={() => {
                        setIsLoading(true)
                        UserService.recoverUserPassword(email).then((response) => {
                            navigation.navigate("RecoverPasswordCode", { email: email })
                            setIsLoading(false)
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
                            setIsLoading(false)
                            console.log(error)
                        })
                    }} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}