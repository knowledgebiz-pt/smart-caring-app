import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ChatSenderComponent from '../components/ChatSenderComponent'

export default function ChatSender({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const messages = route.params.chat.messages

    useEffect(() => {
        console.log('OPEN', ChatSender.name, 'SCREEN')
        console.log(messages)
        return () => {
            console.log('SCREEN', ChatSender.name, 'CLOSE')
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
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : 100}
            >
                <ScrollView style={{ backgroundColor: colors.BaseSlot5 }}>
                    {
                        messages.filter(item => item.viewed == true).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} />
                            )
                        })
                    }

                    {
                        messages.filter(item => item.viewed == false).length > 0 && (
                            <View style={{ width: "100%", backgroundColor: colors.BaseSlot6, height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                                <Text style={[styleSelected.textSecondary, { textAlign: "center", marginTop: 10, color: colors.BaseSlot1 }]}>1 messages unread</Text>
                            </View>
                        )
                    }

                    {
                        messages.filter(item => item.viewed == false).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} />
                            )
                        })
                    }
                </ScrollView>
                <View style={{ maxHeight: 150, flexDirection: "row" }}>
                    <View style={{ flex: 4, justifyContent: "center" }}>
                        <TextInput
                            multiline={true}
                            placeholder={'What´s on your mind?'}
                            placeholderTextColor={colors.BaseSlot3}
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                            style={{
                                backgroundColor: colors.BaseSlot1,
                                minHeight: 40,
                                borderColor: colors.BaseSlot3,
                                borderWidth: 1,
                                margin: 5,
                                borderRadius: 10,
                                padding: 10,
                            }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => console.log('send message', message)}
                            style={{ backgroundColor: colors.BaseSlot2, borderRadius: 50, height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
                            <Image
                                resizeMode='cover'
                                style={{ height: 40, width: 40, borderRadius: 25 }}
                                source={require("../../assets/images/arrow.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}