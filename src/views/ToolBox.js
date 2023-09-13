import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import { useTranslation } from "react-i18next"


export default function ToolBox({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [indexSelected, setIndexSelected] = useState(0)

    const [topPopup, setTopPopup] = useState(0)
    const [leftPopup, setLeftPopup] = useState(0)
    const [listToSearch, setListToSearch] = useState(["Oscar", "Silva"])
    const [showPopup, setShowPopup] = useState(false)

    const searchRef = useRef(null)

    const {t, i18n} = useTranslation()

    useEffect(() => {
        console.log('OPEN', ToolBox.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', ToolBox.name, 'CLOSE')
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
                <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styleSelected.textBold20DarkBlue}>{t("navbar_toolbox")}</Text>
                </View>
                <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
                    <TextInput
                        multiline={true}
                        placeholder={t('search')}
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
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 0 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("filter_all")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIndexSelected(1)}
                            style={{ borderRightWidth: 1, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: indexSelected == 1 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 1 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("private")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIndexSelected(2)}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: indexSelected == 2 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[styleSelected.textRegular16, { color: indexSelected == 2 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("group")}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ height: 1, backgroundColor: colors.BaseSlot5, width: "90%" }} />
                </View>

                <View style={{ height: 50, justifyContent: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                        <TouchableOpacity
                            onPress={() => {
                                searchRef.current.measure((x, y, width, height, pageX, pageY) => {
                                    console.log(x, y, width, height, pageX, pageY)
                                    setTopPopup(pageY - 20)
                                    setLeftPopup(pageX)

                                    console.log(leftPopup, topPopup)
                                })
                                setTimeout(() => {
                                    setShowPopup(!showPopup)
                                }, 100);
                            }}
                            ref={searchRef}
                            style={{ height: 40, width: 120, justifyContent: "center", alignItems: "center", borderRadius: 10, marginLeft: 20, borderColor: colors.BaseSlot2, borderWidth: 1 }}>
                            <Text style={{ color: colors.BaseSlot2 }}>{t("sort_by")}: {t("recent")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                        <TouchableOpacity
                            onPress={() => {
                                searchRef.current.measure((x, y, width, height, pageX, pageY) => {
                                    console.log(x, y, width, height, pageX, pageY)
                                    setTopPopup(pageY - 20)
                                    setLeftPopup(pageX)

                                    console.log(leftPopup, topPopup)
                                })
                                setTimeout(() => {
                                    setShowPopup(!showPopup)
                                }, 100);
                            }}
                            ref={searchRef}
                            style={{ marginRight: 20, height: 40, width: 80, justifyContent: "center", alignItems: "center", borderRadius: 10, marginLeft: 20, borderColor: colors.BaseSlot2, borderWidth: 1 }}>
                            <Text style={{ color: colors.BaseSlot2 }}>{t("filters")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{}}>
                    <View style={{ borderColor: colors.BaseSlot5, borderWidth: 1, height: 300, width: "90%", alignSelf: "center", marginTop: 10, borderRadius: 20, overflow: "hidden", flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    source={{ uri: "https://play-lh.googleusercontent.com/TNjRUOWBR4zEeZZbOexMIvkXyF-CDDRVHxldV5Qj6wULjrHp3DaFz7UYkuL4Fi7lKN0=w600-h300-pc0xffffff-pd" }}
                                    style={{ width: 80, height: 80 }}
                                    resizeMode='cover' />
                            </View>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <View style={{ width: "90%" }}>
                                    <ButtonPrimary
                                        height={40}
                                        title={t("toolbox_download_app")}
                                        fullWidth={true} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={styleSelected.textBold20DarkBlue}>Kwido</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ color: colors.BaseSlot2 }}>https://kwido.com/</Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: "center" }}>
                                <Text>
                                    It is a complete solution for the care of the elderly and dependent people, which allows you to manage the care of your loved ones in a simple and effective way.
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 2 }}>
                                    <Text>{t("languages")}</Text>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>Spanish</Text>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>English</Text>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>French</Text>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>German</Text>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>Italian</Text>
                                        <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>Portuguese</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>{t("pricing")}</Text>
                                    <Text style={{ marginRight: 2, color: colors.BaseSlot3 }}>Free</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {
                    showPopup && (
                        <View style={{ position: "absolute", backgroundColor: "blue", height: 100, width: 100, left: leftPopup, top: topPopup }}>
                            {
                                listToSearch.map((item, index) => {
                                    return (
                                        <Text>{item}</Text>
                                    )
                                })
                            }
                        </View>
                    )
                }

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}