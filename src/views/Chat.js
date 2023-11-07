import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import ChatComponent from '../components/ChatComponent'
import { ChatService } from 'smart-caring-client/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { insertMessage } from '../features/chat/chat'
import { useTranslation } from "react-i18next"
import SearchInput from '../components/SearchInput'
import { FontAwesome } from "@expo/vector-icons"
import ThreeOptionBar from '../components/ThreeOptionBar'

// var tokensClient = ["da17442d-bbf8-4309-933a-017d1e4d6b85", "9063164c-6ad7-4106-b94e-0a69d539f972", "bb36b47b-2913-4722-bedd-97c06a13af72"]

var ws = new WebSocket("wss://smart-caring.azurewebsites.net/private-chat", null, {
    // headers: {
    //     ['token-client']: JSON.stringify(idChats),
    // }
});

// const ws = new WebSocket("ws://192.168.1.82:8000/private-chat", null, {
//     headers: {
//         ['token-client']: JSON.stringify(tokensClient),
//     }
// });

export default function Chat({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    // const [list, setList] = useState([])
    const [socketData, setSocketData] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [idChats, setIdChats] = useState([]);
    const dispatch = useDispatch()
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const list = useSelector((state) => state.chat)

    const [listChat, setListChat] = useState(list)

    const [indexSelected, setIndexSelected] = useState(0)
    const [find, setFind] = useState('')

    const { t, i18n } = useTranslation()

    useEffect(() => {

        GetChatUpdated()

        const unsubscribe = navigation.addListener('focus', () => {
            GetChatUpdated()
          });

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
            GetChatUpdated()
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

    function GetChatUpdated() {
        AsyncStorage.getItem('@token').then((token) => {
            console.log(token)
            setIdUser(token)
            ChatService.getChatByIdUser(token).then((response) => {
                // setList(response.data)
                dispatch(insertMessage(response.data))
                setListChat([])
                if (indexSelected == 0)
                    setListChat(response.data)
                if (indexSelected == 1)
                    setListChat(response.data.filter((item) => item.chat_members.length == 2))
                if (indexSelected == 2)
                    setListChat(response.data.filter((item) => item.chat_members.length > 2))
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    function filterChat() {
        console.log(indexSelected)
        if (indexSelected == 1) {
            // setList(list.filter((item) => item.chat_members.length == 2))
        } else if (indexSelected == 2) {
            // setList(list.filter((item) => item.chat_members.length > 2))
        } else {
            // setList(list)
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
                    <Text style={styleSelected.textBold20DarkBlue}>{t("navbar_chat")}</Text>
                </View>
                <View style={{ flex: .1, justifyContent: "center", alignItems: "center", }}>
                    <View style={{ borderWidth: .5, borderColor: colors.BaseSlot5, width: "90%", flexDirection: "row", borderRadius: 30, padding: 3 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                            <FontAwesome size={15} color={colors.BaseSlot5} name='search' />
                        </View>
                        <SearchInput value={search} placeholder={t("search")} onChangeText={(val) => {
                            setSearch(val)
                            if (val.length > 0) {
                                if (indexSelected == 0) {
                                    var listWithFilter = []
                                    list.forEach(element => {
                                        element.chat_members.forEach(members => {
                                            if (members.name.toLowerCase().includes(val.toLowerCase())) {
                                                listWithFilter.push(element)
                                            }
                                        });
                                    });
                                    var t = list.filter((item) => item.chat_name.toLowerCase().includes(val.toLowerCase()))
                                    setListChat(listWithFilter.concat(t))
                                }
                                else if (indexSelected == 1) {
                                    var listWithFilter = []
                                    list.forEach(element => {
                                        element.chat_members.forEach(members => {
                                            if (members.name.toLowerCase().includes(val.toLowerCase())) {
                                                listWithFilter.push(element)
                                            }
                                        });
                                    });
                                    setListChat(listWithFilter)
                                }
                                else if (indexSelected == 2) {
                                    setListChat(list.filter((item) => item.chat_name.toLowerCase().includes(val.toLowerCase())))
                                }
                            } else {
                                if (indexSelected == 0)
                                    setListChat([...list])
                                if (indexSelected == 1)
                                    setListChat(list.filter((item) => item.chat_members.length == 2))
                                if (indexSelected == 2)
                                    setListChat(list.filter((item) => item.chat_members.length > 2))
                            }
                        }} />
                    </View>
                </View>
                <View style={{ height: 70, justifyContent: "space-evenly", alignItems: "center" }}>
                    <ThreeOptionBar indexSelected={indexSelected}
                        onPressLeft={() => {
                            setIndexSelected(0); 
                            setListChat(list)
                        }} 
                        onPressCenter={() => {
                            setIndexSelected(1)
                            setListChat(list.filter((item) => item.chat_members.length == 2))
                        }}
                        onPressRight={() => {
                            setIndexSelected(2)
                            setListChat(list.filter((item) => item.chat_members.length > 2))
                        }} 
                        textLeft={t("filter_all")}
                        textCenter={t("private")}
                        textRight={t("group")}
                    />
                    <View style={{ height: 1, backgroundColor: colors.BaseSlot5, width: "90%" }} />
                </View>
                <View style={{ flex: 1, width: "100%", alignSelf: "center", marginTop: 10 }}>
                    <FlatList
                        data={listChat}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <ChatComponent value={item} navigation={navigation} idUser={idUser} ws={ws} update={GetChatUpdated} />
                            )
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateChat", { update: GetChatUpdated })}
                    style={{ backgroundColor: colors.BaseSlot4, width: 120, height: 60, position: "absolute", bottom: 30, borderRadius: 100, right: -30, justifyContent: "center" }} >
                    <FontAwesome color={colors.BaseSlot1} size={40} name='plus' style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}