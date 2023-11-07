import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonTransparent from '../components/ButtonTransparent'
import { useTranslation } from "react-i18next"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function FirstAccess({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const {t, i18n} = useTranslation()

    useEffect(() => {
        console.log('OPEN', FirstAccess.name, 'SCREEN')
        //For test loading
        setIsLoading(true)
        AsyncStorage.setItem("@hadFirstAccess", "1")
        return () => {
            console.log('SCREEN', FirstAccess.name, 'CLOSE')
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
        <SafeAreaView style={[styleSelected.backgroundPrimary, styleSelected.AndroidSafeArea, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
                    <Image source={require("../../assets/images/logo.png")}
                        resizeMode='contain'
                        style={{ height: 90, width: 183, alignSelf: "center" }} />
                    <View style={[styleSelected.imageContainerNoMarginTop, {backgroundColor: "transparent"}]}>
                    <Image source={require("../../assets/images/Inicio.png")}
                        resizeMode='cover'
                        style={{ height: 600, width: 350, alignSelf: "center" }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                        <ButtonPrimary title={t("login")} event={() => {navigation.navigate("Login")}}/>
                        <ButtonTransparent title={t("login_no_account")} titleBold={t("login_sign_up")} event={() => {navigation.navigate("Register")}}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}