import React, { useEffect, useState } from 'react'
import { Image, useColorScheme, View,  } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'

// OpenAPI.BASE = 'http://10.103.20.234:8000'

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
                console.warn(res)
                setTimeout(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'BottomTab' }],
                        })
                    )
                }, 1000)

            }
            else {
                setTimeout(() => {
                    AsyncStorage.getItem("@hadFirstAccess").then(res => {
                        if (res) {
                            navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: 'Login' }],
                                })
                            )
                        }
                        else {
                            navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: 'FirstAccess' }],
                                })
                            )
                        }
                    })
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