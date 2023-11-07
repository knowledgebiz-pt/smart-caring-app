import React, { useEffect } from 'react'
import { Appearance, useColorScheme, Platform, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'

export default function SearchInput({ value, placeholder, onChangeText }) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
    }, [])
    Appearance.getColorScheme()
    Appearance.addChangeListener(({ colorScheme }) => {
        console.log('COLOR THEME WAS ALTER')
        console.log(colorScheme)
        if (Platform.OS === 'android')
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.Base_Slot_1 : colors.Base_Slot_1)
    })
    return (
        <TextInput style={{marginLeft:10, width:"100%", height: 30, minHeight:30 }} value={value} placeholder={placeholder} onChangeText={onChangeText} />
    )
}