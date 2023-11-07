import React from "react";
import { View,Text, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param inputMode: string - Determines type of keyboard to open. Defaults to "text". Valid values: 'decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url'
 * @param secureTextEntry: boolean - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Defaults to false.
 * @param onSubmitEditing: function - Callback that is called when the text input's submit button is pressed.
 * @param returnKeyType: string - Determines how the return key looks. Valid values: 'default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call'. Defaults to 'default'
 * @param inputRef: React.MutableRefObject<undefined> - Allows getting a ref to the component instance. Defaults to null
 * @param blurOnSubmit: boolean - If true, closes the keyboard on pressing the submit button. Defaults to true
 * @param onChangeText: function - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 * @param inputColor: string - Color of the input text
 * @param fontSize: integer - Size of the input text font
 * @param event: any
 * @param value: string - value of input
 */

export default function InputTransparentLabelAbove(
    { 
        placeholder, 
        inputMode="text", 
        secureTextEntry=false,
        onSubmitEditing, 
        returnKeyType="default", 
        inputRef=null,
        blurOnSubmit=true,
        hasBorder=false,
        borderColor,
        onChangeText,
        fullWidth=false,
        inputColor,
        fontSize,
        event,
        value
    }) {

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let inputStyles = { backgroundColor: colors.BaseSlot1, flexDirection: "row", paddingLeft: 20 }
    const sizeStyleSelected = fullWidth ? styleSelected.buttonSizeFullWidth : styleSelected.buttonSize
    if (hasBorder) {
        inputStyles['borderWidth'] = 1
        inputStyles['borderColor'] = borderColor
    }
    if (inputColor) {
        inputStyles['color'] = inputColor
    }
    if (fontSize) {
        inputStyles['fontSize'] = fontSize
    }
    return (
        <View>
            <Text style={[styleSelected.textRegular13DarkBlue,{marginLeft: 20, marginBottom: 5}]}>{placeholder}</Text>
            <TextInput
                style={[sizeStyleSelected, inputStyles]}
                placeholderTextColor="rgba(101, 101, 101, 0.5)"
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                ref={inputRef}
                blurOnSubmit={blurOnSubmit}
                onChangeText={onChangeText}
                value={value}       
            />
        </View>
    )
}