import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'

export default function ChatSenderComponent({ message, members }) {
    const [isLoading, setIsLoading] = useState(true)
    const [imSender, setImSender] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', ChatSenderComponent.name, 'SCREEN')
        console.log("SENDER " + members)
        if (message.id_user_sender == 1) {
            setImSender(true)
        }

        return () => {
            console.log('SCREEN', ChatSenderComponent.name, 'CLOSE')
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
        <>
            {
                imSender ? (
                    <View style={{ width: "80%", alignSelf: "flex-end", marginTop: 10, minHeight: 50, justifyContent: "flex-end", alignItems: "flex-end", marginRight: 10, flexDirection: "row" }}>
                        <Text>{new Date(message.date).toLocaleTimeString()}</Text>
                        <View style={{ backgroundColor: colors.BaseSlot2, alignItems: "center", borderRadius: 10, minHeight: 50, justifyContent: "center" }}>
                            <Text style={{ color: colors.BaseSlot1, flexWrap: "wrap", width: "80%", textAlign: "right", padding: 10 }}>{message.content}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={{ width: "80%", alignSelf: "flex-start", marginTop: 10, minHeight: 50, justifyContent: "flex-start", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                        <Image
                            style={{ width: 50, height: 50, alignSelf: "flex-end", borderRadius: 50, marginRight: 10 }}
                            source={{ uri: members.findLast(item => item.id_user == message.id_user_sender).picture }} />
                        <View style={{ backgroundColor: colors.BaseSlot1, alignItems: "center", maxWidth: "60%", borderRadius: 10, padding: 10 }}>
                            <Text style={{ flexWrap: "wrap", width: "80%", color: colors.BaseSlot4, fontWeight: 800 }}>{members.findLast(item => item.id_user == message.id_user_sender).name}</Text>
                            <Text style={{ flexWrap: "wrap", width: "80%" }}>{message.content}</Text>
                        </View>
                        <Text>{new Date(message.date).toLocaleTimeString()}</Text>
                    </View>
                )
            }
        </>
    )
}