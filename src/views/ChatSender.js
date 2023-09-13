import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ChatSenderComponent from '../components/ChatSenderComponent'
import { useSelector } from 'react-redux'

export default function ChatSender({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState([])
    const [msg, setMsg] = useState('')
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const chatMessage = useSelector((state) => state.chat)

    console.log("CHAT MESSAGE OSCAR1", chatMessage)

    const messages = route.params.chat.message



    useEffect(() => {
        console.log('OPEN', ChatSender.name, 'SCREEN')
        console.log("CHATTTT SENDERRR", route.params.chat)
        console.log("IDDDDDD", route.params.idUser)
        return () => {
            console.log('SCREEN', ChatSender.name, 'CLOSE')
        }
    }, [])

    useEffect(() => {
        console.log("CHAT ATUALIZADO", chatMessage)
        var listAdd = chatMessage.find(item => item.id_chat == route.params.chat.id_chat)
        setMessage(listAdd.message)
    }, [chatMessage])

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
                        message.filter(item => item.viewed == true).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} idUser={route.params.idUser} />
                            )
                        })
                    }

                    {
                        message.filter(item => item.viewed == false).length > 0 && (
                            <View style={{ width: "100%", backgroundColor: colors.BaseSlot6, height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                                <Text style={[styleSelected.textSecondary, { textAlign: "center", marginTop: 10, color: colors.BaseSlot1 }]}>1 messages unread</Text>
                            </View>
                        )
                    }

                    {
                        message.filter(item => item.viewed == false).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} idUser={route.params.idUser} />
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
                            onChangeText={(text) => setMsg(text)}
                            value={msg}
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
                            onPress={() => {
                                route.params.ws.send(JSON.stringify({
                                    "id-chat": "bb36b47b-2913-4722-bedd-97c06a13af72",
                                    "id_user_sender": "321",
                                    "name_user_sender": "Camila",
                                    "picture_user_sender": "",
                                    "content": "Teste com react native",
                                    "type_content": "text"
                                }));
                            }}
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