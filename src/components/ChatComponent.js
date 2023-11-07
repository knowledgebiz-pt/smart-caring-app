import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, Image, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { useTranslation } from "react-i18next"
import { FontAwesome } from '@expo/vector-icons';


export default function ChatComponent({ value, navigation, idUser, ws, update }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [userReceiver, setUserReceiver] = useState(null)
    const [lastedMessage, setLastedMessage] = useState(null)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        console.log('OPEN', ChatComponent.name, 'SCREEN')
        console.log("IDDDDDDDDDDDDDDD", idUser)
        var userReceiver = value.chat_members.findLast((item) => {
            return item.id_user != 1
        })
        setUserReceiver(userReceiver)
        setLastedMessage(value.message[value.message.length - 1])
        return () => {
            console.log('SCREEN', ChatComponent.name, 'CLOSE')
        }
    }, [])
    Appearance.getColorScheme()
    Appearance.addChangeListener(({ colorScheme }) => {
        console.log('COLOR THEME WAS ALTER')
        console.log(colorScheme)
        if (Platform.OS === 'android'){
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.Base_Slot_1 : colors.Base_Slot_1)
        }
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
            <TouchableOpacity
                style={{ height: 80, flexDirection: "row", alignItems: "center", backgroundColor: lastedMessage?.viewed ? "transparent" : colors.BaseSlot4 }}
                onPress={() => navigation.navigate("ChatSender", {chat: value, idUser: idUser, ws: ws, update: update})}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 10, borderRadius: 60, overflow: "hidden", height: 65, maxWidth: 65 }}>
                    {
                        value.chat_members.findLast(item => item.id_user != idUser)?.picture != "" && value.chat_members.length <= 2 ? (
                            <Image
                                style={{ width: 70, height: 70 }}
                                resizeMode='cover'
                                source={{ uri: value.chat_members.findLast(item => item.id_user != idUser)?.picture ? value.chat_members.findLast(item => item.id_user != idUser)?.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }}
                            />
                        ) : (
                            <View style={{ borderColor: lastedMessage?.viewed ? colors.BaseSlot3 : colors.BaseSlot1, borderWidth: 1, height: "100%", width: "95%", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: lastedMessage?.viewed ? colors.BaseSlot3 : colors.BaseSlot1 }}>{String(value.chat_name.slice(0, 2)).toLocaleUpperCase()}</Text>
                            </View>
                        )
                    }
                </View>

                <View style={{ flex: 2, height: "100%" }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        {
                            value.chat_members.length > 2 ? (
                                <Text style={[styleSelected.textRegular16, { color: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1 }]}>{value.name == undefined ? t("group_chat") : value.name}</Text>
                            ) : (
                                <Text style={[styleSelected.textRegular16, { color: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1 }]}>{value.chat_members.findLast(item => item.id_user != idUser)?.name}</Text>
                            )
                        }
                        {
                            value.chat_members.findLast(item => item.id_user != idUser)?.user_type == "Patient" && value.chat_members.length < 3 && (
                                <Image
                                    style={{ width: 25, height: 25, marginLeft: 10, tintColor: lastedMessage?.viewed ? null : "white" }}
                                    resizeMode='cover'
                                    source={require('../../assets/images/Patient.png')}
                                />
                            )
                        }
                        {
                            value.chat_members.findLast(item => item.id_user != idUser)?.user_type == "Health Professional" && value.chat_members.length < 3 && (
                                <Image
                                    style={{ width: 25, height: 25, marginLeft: 10, tintColor: lastedMessage?.viewed ? null : "white" }}
                                    resizeMode='cover'
                                    source={require('../../assets/images/Healthprofessional.png')}
                                />
                            )
                        }
                        {
                            value.chat_members.findLast(item => item.id_user != idUser)?.user_type == "caregiver" && value.chat_members.length < 3 && (
                                <Image
                                    style={{ width: 25, height: 25, marginLeft: 10, tintColor: lastedMessage?.viewed ? null : "white" }}
                                    resizeMode='cover'
                                    source={require('../../assets/images/Caregiver.png')}
                                />
                            )
                        }
                        {
                            value.chat_members.length > 2 && (
                                // <FontAwesome name="users" size={16} color="black" style={{marginLeft: 10}}/>
                                <Image
                                    style={{ width: 18, height: 18, marginLeft: 10, tintColor: lastedMessage?.viewed ? null : "white" }}
                                    resizeMode='cover'
                                    source={require('../../assets/images/users-icon.png')}
                                />
                            )
                        }
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        {
                            value.chat_members.findLast(item => item.id_user == lastedMessage?.id_user_sender)?.name != undefined ? (
                                <Text style={[styleSelected.textRegular16, { color: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1 }]}>{value.chat_members.findLast(item => item.id_user == lastedMessage?.id_user_sender)?.name + ": " + lastedMessage?.content}</Text>
                            ) : (
                                <Text style={[styleSelected.textRegular16, { color: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1 }]}></Text>
                            )
                        }
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                    {
                        new Date(lastedMessage?.date).toLocaleDateString() != "Invalid Date" && (
                            <Text style={[styleSelected.textRegular12, { color: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1, fontSize: 12 }]}>{new Date(lastedMessage?.date).toLocaleDateString() + " " +  new Date(lastedMessage?.date).toLocaleTimeString().substring(0, 5)}</Text>
                        )
                    }
                </View>
            </TouchableOpacity >
            <View style={{ height: 1, backgroundColor: lastedMessage?.viewed ? colors.BaseSlot5 : colors.BaseSlot1, width: "90%", alignSelf: "center" }} />
        </>
    )
}