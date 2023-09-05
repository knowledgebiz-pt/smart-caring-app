import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import InputDefault from '../components/InputDefault'

export default function CreateEvent({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [nameEvent, setNameEvent] = useState("")
    const [descriptionEvent, setDescriptionEvent] = useState("")
    const [dateStartEvent, setDateStartEvent] = useState("")
    const [dateEndEvent, setDateEndEvent] = useState("")
    const [timeStartEvent, setTimeStartEvent] = useState("")
    const [timeEndEvent, setTimeEndEvent] = useState("")
    const [isAllDayEvent, setIsAllDayEvent] = useState(false)
    const [isAlarmEvent, setIsAlarmEvent] = useState(false)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', CreateEvent.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', CreateEvent.name, 'CLOSE')
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
                    <InputDefault
                        input={nameEvent}
                        setInput={setNameEvent}
                        placeholder={"Title"}
                        inputColor={"black"}
                        lineFocusColor={colors.BaseSlot2}
                        lineUnfocusColor={colors.BaseSlot4}
                    />
                    <InputDefault
                        input={descriptionEvent}
                        setInput={setDescriptionEvent}
                        placeholder={"Description"}
                        inputColor={"black"}
                        lineFocusColor={colors.BaseSlot2}
                        lineUnfocusColor={colors.BaseSlot4}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}