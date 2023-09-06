import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ChatComponent from '../components/ChatComponent'
import InputDefault from '../components/InputDefault'
import { CommentService } from 'smart-caring-client/client'

const listMock = [{
    id_chat: 1,
    name: '',
    chat_last_updated: '2021-01-01 00:00:00',
    chat_picture: "",
    chat_members: [{
        id_user: 1,
        name: 'Rodrigo Silva',
        picture: 'https://www.w3schools.com/howto/img_avatar.png',
        user_type: "Patient"
    }, {
        id_user: 2,
        name: 'Oscar',
        picture: 'https://www.w3schools.com/howto/img_avatar.png',
        user_type: "Health Professional"
    }],
    messages: [{
        id_message: 1,
        type: 'text',
        content: 'Olá, tudo bem?',
        date: '2021-01-01 00:00:00',
        id_user_sender: 1,
        deleted: false,
        viewed: true,
        sent: true,
    },
    {
        id_message: 2,
        type: 'text',
        content: 'Sim, e com você????',
        date: '2021-01-01 00:00:10',
        id_user_sender: 2,
        deleted: false,
        viewed: true,
        sent: true,
    }]
},
{
    id_chat: 2,
    name: 'Grupo da família',
    chat_last_updated: '2021-01-01 00:00:00',
    chat_picture: "",
    chat_members: [{
        id_user: 1,
        name: 'Rodrigo Silva',
        picture: 'https://www.w3schools.com/howto/img_avatar.png',
        user_type: "Patient"
    }, {
        id_user: 2,
        name: 'Oscar Augusto',
        picture: 'https://www.w3schools.com/howto/img_avatar.png',
        user_type: "Health Professional"
    }, {
        id_user: 3,
        name: 'Paola Silva',
        picture: 'https://www.w3schools.com/howto/img_avatar.png',
        user_type: "Caregiver"
    }],
    messages: [{
        id_message: 1,
        type: 'text',
        content: 'Olá, tudo bem?',
        date: '2021-01-01 00:00:00',
        id_user_sender: 1,
        deleted: false,
        viewed: true,
        sent: true,
    },
    {
        id_message: 2,
        type: 'text',
        content: 'Sim, e com você?',
        date: '2021-01-01 00:00:10',
        id_user_sender: 2,
        deleted: false,
        viewed: true,
        sent: true,
    }, {
        id_message: 3,
        type: 'text',
        content: 'Tudo bem também asdasdasdasdasdasdas asdasd asdasd asd a',
        date: '2021-01-01 00:00:10',
        id_user_sender: 3,
        deleted: false,
        viewed: false,
        sent: true,
    }],
}]

var tokensClient = ["da17442d-bbf8-4309-933a-017d1e4d6b85", "9063164c-6ad7-4106-b94e-0a69d539f972"]

const ws = new WebSocket("wss://smart-caring.azurewebsites.net/private-chat", null, {
    headers: {
        ['token-client']: JSON.stringify(tokensClient),
    }
});

export default function Chat({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [list, setList] = useState(listMock)
    const [socketData, setSocketData] = useState(null);

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [indexSelected, setIndexSelected] = useState(0)
    const [find, setFind] = useState('')

    useEffect(() => {

        console.log('INIT WebSocket connection opened');
        ws.onopen = () => {
            // Connection opened
            console.log('WebSocket connection opened');
        };

        ws.onclose = event => {
            // Connection closed
            console.log('WebSocket connection closed:', event);
        };

        ws.onmessage = event => {
            console.log('WebSocket message received:', event.data);
        };

        console.log('OPEN', Chat.name, 'SCREEN')
        setIsLoading(true)

        return () => {
            console.log('SCREEN', Chat.name, 'CLOSE')
        }
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {

        })
        navigation.addListener('blur', () => {
            // console.log('WebSocket connection closed');
            // ws.close();
        })
    }, [navigation])

    useEffect(() => {
        filterChat()
    }, [indexSelected])

    function filterChat() {
        console.log(indexSelected)
        if (indexSelected == 1) {
            setList(listMock.filter((item) => item.chat_members.length == 2))
        } else if (indexSelected == 2) {
            setList(listMock.filter((item) => item.chat_members.length > 2))
        } else {
            setList(listMock)
        }
    }

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
                style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styleSelected.textBold20DarkBlue}>Chat</Text>
                </View>
                <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
                    <TextInput
                        multiline={true}
                        placeholder={'Search'}
                        placeholderTextColor={colors.BaseSlot3}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
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
                <View style={{ height: 70, justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ height: 40, borderColor: colors.BaseSlot5, borderWidth: 1, width: "90%", borderRadius: 40, flexDirection: "row" }}>

                        <TouchableOpacity
                            onPress={() => setIndexSelected(0)}
                            style={{ borderRightWidth: 1, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: indexSelected == 0 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 0 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setIndexSelected(1)
                                ws.send(JSON.stringify({
                                    "token-chat": "da17442d-bbf8-4309-933a-017d1e4d6b85",
                                    "id_user_sender": "123",
                                    "name_user_sender": "Oscar",
                                    "picture_user_sender": "",
                                    "content": "Teste com react native Ragner",
                                    "type_content": "text"
                                }));
                            }}
                            style={{ borderRightWidth: 1, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: indexSelected == 1 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 1 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>Private</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIndexSelected(2)}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: indexSelected == 2 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 2 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>Group</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ height: 1, backgroundColor: colors.BaseSlot5, width: "90%" }} />
                </View>
                <View style={{ flex: 1, width: "100%", alignSelf: "center", marginTop: 10 }}>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <ChatComponent value={item} navigation={navigation} />
                            )
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}