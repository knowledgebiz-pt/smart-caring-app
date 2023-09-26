import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { ChatService, UserService } from 'smart-caring-client/client'
import DropDownPicker from 'react-native-dropdown-picker';
import SearchInput from '../components/SearchInput'
import { useTranslation } from "react-i18next"
import { FontAwesome } from "@expo/vector-icons"
import ButtonPrimary from '../components/ButtonPrimary'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'

export default function CreateChat({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [usersBackup, setUsersBackup] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [search, setSearch] = useState("")

    const [usersSelected, setUsersSelected] = useState([])
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const { t, i18n } = useTranslation()

    const user = useSelector((state) => state.user)

    useEffect(() => {
        console.log('OPEN', CreateChat.name, 'SCREEN')

        UserService.getAllUsers().then((res) => {
            console.log(res.data)
            setUsers(res.data)
            setUsersBackup(res.data)
            setUsersSelected([user])
            setIsLoading(true)
        }).catch((err) => {
            console.error(err)
        })

        return () => {
            console.log('SCREEN', CreateChat.name, 'CLOSE')
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

    //this function go remove user object if already existy in array or add if not exist
    function addUsersSelected(user) {
        if (usersSelected.includes(user)) {
            setUsersSelected(usersSelected.filter((item) => {
                return item != user
            }))
        } else {
            setUsersSelected([...usersSelected, user])
        }
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
                    <View style={{ borderWidth: .5, borderColor: colors.BaseSlot5, width: "90%", flexDirection: "row", borderRadius: 30, padding: 3, alignSelf: "center" }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                            <FontAwesome size={15} color={colors.BaseSlot5} name='search' />
                        </View>
                        <SearchInput value={search} placeholder={t("search")} onChangeText={(val) => {
                            setSearch(val)
                            setUsers(usersBackup.filter((item) => {
                                return item.name.toLowerCase().includes(val.toLowerCase())
                            }))
                        }} />
                    </View>
                    <View style={{ height: 80 }}>

                        <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
                            {usersSelected.map((item) => {
                                return (
                                    <View style={{ backgroundColor: colors.BaseSlot2, height: 60, margin: 5, borderRadius: 50, padding: 5, flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.picture == (undefined || "") ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" : item.picture }} />
                                        <Text>{item.name}</Text>
                                    </View>
                                )
                            }
                            )}
                        </ScrollView>

                    </View>
                    <FlatList
                        data={users}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => addUsersSelected(item)}
                                    style={{ height: 50, backgroundColor: colors.BaseSlot1, margin: 10, justifyContent: "flex-end" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} source={{ uri: item.picture == (undefined || "") ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" : item.picture }} />
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: colors.BaseSlot4 }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <ButtonPrimary
                        event={() => {
                            if (usersSelected.length > 1) {
                                var dataToSender = []
                                usersSelected.forEach(element => {
                                    var data = {
                                        "id_user": element._id.$oid,
                                        "name": element.name,
                                        "picture": element.picture,
                                        "user_type": element.user_type
                                    }
                                    dataToSender.push(data)
                                });
                                ChatService.createChat({
                                    chat_members: dataToSender,
                                }).then((res) => {
                                    route.params.update()
                                    navigation.goBack()

                                }).catch((err) => {
                                    console.error(err)
                                })
                            } else {
                                Toast.show({
                                    type: 'error',
                                    position: 'bottom',
                                    text1: t("error"),
                                    text2: t("error_create_chat"),
                                    visibilityTime: 4000,
                                    autoHide: true,
                                    topOffset: 30,
                                    bottomOffset: 40,
                                })
                            }
                        }}
                        title={t("create_chat")}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}