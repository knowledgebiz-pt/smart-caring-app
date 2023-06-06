import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import HeaderLogoAndProfileImage from '../components/HeaderLogoAndProfileImage'
import { UserService } from "smart-caring-client/client"
import PostInputTransparent from '../components/PostInputTransparent'

export default function HomePage({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")

    const [postInput, setPostInput] = useState("")
    const [inputLength, setInputLength] = useState(0)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        UserService.getUserDataByIdUser("Ruben@teste.com", "Teste").then(res => {
            setUser(res.data)
            setName(res.data.name)
            setIsLoading(false)
        }).catch(e =>{ 
            console.error("e: ",e)
            setIsLoading(false)
        })
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
    if (isLoading) {
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
                <View style={styleSelected.backgroundPrimary}>
                    <HeaderLogoAndProfileImage img={user.picture}/>
                </View>
                <View style={{alignSelf: "center"}}>
                    <Text style={[styleSelected.textBold10DarkBlue, {marginTop: -15}]}>Hello, {name.split(" ")[0]}!</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <PostInputTransparent blurOnSubmit={false} img={user.picture} onChangeText={(text) => {setPostInput(text)}} value={postInput} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}