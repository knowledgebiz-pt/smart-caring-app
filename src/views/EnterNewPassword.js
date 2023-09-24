import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, KeyboardAvoidingView, StatusBar, ScrollView, Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import InputTransparent from '../components/InputTransparent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from "react-i18next"
import { UserService } from 'smart-caring-client/client'
import Toast from 'react-native-toast-message'

export default function EnterNewPassword({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const ref_input2 = useRef()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { t, i18n } = useTranslation()


    useEffect(() => {
        console.log('OPEN', EnterNewPassword.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            console.log('SCREEN', EnterNewPassword.name, 'CLOSE')
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
        <SafeAreaView style={[styleSelected.backgroundPrimary, styleSelected.AndroidSafeArea, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 0}
            >
                {/* <KeyboardAwareScrollView style={{flex:1}}> */}
                <ScrollView style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
                    <View style={[styleSelected.smallerImageContainer, { backgroundColor: "transparent" }]}>
                        <Image source={require("../../assets/images/NewPassword.png")}
                            resizeMode='cover'
                            style={{ height: 440, width: 353, alignSelf: "center" }} />
                    </View>
                    {/* <View style={{flex:1}}> */}
                    <Text style={[styleSelected.textBold20DarkBlue, { marginTop: 45, textAlign: "center" }]}>{t("new_password")}</Text>
                    <Text style={[styleSelected.textRegular14Gray, { width: "65%", marginTop: 5, textAlign: "center", alignSelf: "center" }]}>{t("new_password_subtext")}</Text>

                    {/* </View> */}
                    <View style={styleSelected.paleBlueContainer}>
                        <InputTransparent value={password} setValue={setPassword} onChangeText={(text) => { setPassword(text) }} blurOnSubmit={false} isPassword={true} onSubmitEditing={() => ref_input2.current?.focus()} returnKeyType='next' placeholder={t("new_password_enter")} />
                        <InputTransparent value={confirmPassword} setValue={setConfirmPassword} onChangeText={(text) => { setConfirmPassword(text) }} inputRef={ref_input2} isPassword={true} placeholder={t("new_password_confirm")} />
                        <ButtonPrimary title={t("new_password_reset")} event={() => {
                            console.log("EMAIL", route.params.email)
                            console.log("PASSWORD", password)
                            UserService.updateUserPassword(route.params.email, password).then((response) => {
                                navigation.navigate("SuccessNewPassword")
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
                    </View>
                </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}