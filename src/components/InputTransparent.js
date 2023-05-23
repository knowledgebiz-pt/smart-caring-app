import React from "react";
import { Text, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

export default function InputTransparent(
    { 
        placeholderText, 
        inputMode="text", 
        isPassword=false,
        onSubmitEditing=() => {}, 
        returnKeyType="default", 
        inputRef=null,
        blurOnSubmit=true,
        event 
    }) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    return (
        <TextInput
            style={[styleSelected.buttonSize, { backgroundColor: colors.Base_Slot_1, flexDirection: "row", paddingLeft: 20 }]}
            placeholder={placeholderText}
            placeholderTextColor="rgba(101, 101, 101, 0.5)"
            inputMode={inputMode}
            secureTextEntry={isPassword}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            ref={inputRef}
            blurOnSubmit={blurOnSubmit}
            
            />
    )
}