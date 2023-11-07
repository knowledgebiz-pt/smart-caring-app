import React, { useEffect, useState, useCallback } from 'react'
import { Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader' 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatSenderComponent({ message, members, idUser }) {
    const [isLoading, setIsLoading] = useState(true)
    const [imSender, setImSender] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', ChatSenderComponent.name, 'SCREEN')
        console.log("SENDER " + members)
        console.log("IM SENDER " + idUser)
        if (message.id_user_sender == idUser) {
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
                    <View style={{ width: "80%", alignSelf: "flex-end", marginTop: 10, minHeight: 50, justifyContent: "flex-end", alignItems: "flex-end", marginRight: 10, flexDirection: "row", marginBottom:5 }}>
                        <View style={{ backgroundColor: colors.BaseSlot2, alignItems: "center", borderRadius: 10, minHeight: 50, justifyContent: "center" }}>
                            <Text style={{ color: colors.BaseSlot1, flexWrap: "wrap", width: "100%", textAlign: "right", padding: 10, maxWidth:"100%" }}>{message.content}</Text>
                            <View style={{flexDirection:"row", width:"100%" }}>
                                <Text style={{ alignItems:"flex-start", paddingLeft:5, paddingRight:5, paddingBottom:5, fontSize:11, color:"#ddd", fontWeight:600}}>{new Date(message.date).toLocaleTimeString().substring(0,5)}</Text>
                                <MaterialCommunityIcons style={{ justifyContent:"flex-end", alignContent:"flex-end", alignItems:"flex-end", paddingTop:1, paddingRight:5, color: message.viewed ? "#90CAB7" : "#ddd" }} name='check-all' size={13}/>
                            </View>

                        </View>
                    </View>
                ) : (
                    <View style={{ width: "80%", alignSelf: "flex-start", marginTop: 10, minHeight: 50, justifyContent: "flex-start", flexDirection: "row", alignItems: "center", marginLeft: 10, marginBottom:5 }}>
                        <Image
                            style={{ width: 50, height: 50, alignSelf: "flex-end", borderRadius: 50, marginRight: 10 }}
                            source={{ uri: message.picture_user_sender == "" ? "https://cdn.imgbin.com/8/20/20/imgbin-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-pvE7Qhr6Zk7kLJpGiWZ9FFRVf.jpg" : message.picture_user_sender }} />
                        <View style={{ backgroundColor: colors.BaseSlot1, alignItems: "center", maxWidth: "80%", borderRadius: 10, padding: 10, paddingRight:0, paddingBottom:0 }}>
                            <Text style={{ flexWrap: "wrap", width: "100%", color: colors.BaseSlot4, fontWeight: 800, paddingRight:10 }}>{members.findLast(item => item.id_user == message.id_user_sender)?.name}</Text>
                            <Text style={{ flexWrap: "wrap", width: "100%", maxWidth:"100%", paddingRight:10 }}>{message.content}</Text>
                            <Text style={{textAlign:"right", width:"100%", right:0, paddingRight:5, paddingLeft:15, paddingTop:5, paddingBottom:5, fontSize:11, color:"#333", fontWeight:600}}>{new Date(message.date).toLocaleTimeString().substring(0,5)}</Text>
                        </View>
                    </View>
                )
            }
        </>
    )
}