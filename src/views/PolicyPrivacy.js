import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from "react-i18next"

export default function PolicyPrivacy({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const {t, i18n} = useTranslation()

    useEffect(() => {
        console.log('OPEN', PolicyPrivacy.name, 'SCREEN')
        return () => {
            console.log('SCREEN', PolicyPrivacy.name, 'CLOSE')
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
                <ScrollView style={[styleSelected.backgroundPrimary, { flex: 1, margin: 10 }]}>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_1")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_2")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_3")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_4")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_5")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_6")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_7")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_8")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_9")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_10")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_11")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_12")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_13")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_14")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_15")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_16")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_17")}</Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>{t("privacy_policy_18")}</Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{t("privacy_policy_19")}</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}