import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Image, useColorScheme, View,  } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { OpenAPI } from 'smart-caring-client/client'

export default function SplashScreen({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', SplashScreen.name, 'SCREEN')
        checkContainToken()
        //For test loading
        return () => {
            console.log('SCREEN', SplashScreen.name, 'CLOSE')
        }
    }, [])

    const checkContainToken = () => {
        AsyncStorage.getItem("@token").then(res => {
            if (res) {
                setTimeout(() => {
                    navigation.navigate("BottomTab")
                }, 1000)

            }
            else {
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 1000)
            }
        })
    }

    return (
        <View style={{flex: 1, justifyContent:"center"}}>
            <Image source={require("../../assets/images/logo.png")} resizeMode='contain' style={{width: 250, height: 250, alignSelf:"center", justifyContent:"center"}} />
        </View>
    )
}