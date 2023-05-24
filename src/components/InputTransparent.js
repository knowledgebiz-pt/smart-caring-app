import React from "react";
import { Text, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param inputMode: string - Determines type of keyboard to open. Defaults to "text". Valid values: 'decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url'
 * @param secureTextEntry: boolean - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Defaults to false.
 * @param onSubmitEditing: function - Callback that is called when the text input's submit button is pressed. Defaults to an empty function
 * @param returnKeyType: string - Determines how the return key looks. Valid values: 'default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call'. Defaults to 'default'
 * @param inputRef: React.MutableRefObject<undefined> - Allows getting a ref to the component instance. Defaults to null
 * @param blurOnSubmit: boolean - If true, closes the keyboard on pressing the submit button. Defaults to true
 * @param onChangeText: function - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
 * @param event: any
 */

export default function InputTransparent(
    { 
        placeholder, 
        inputMode="text", 
        secureTextEntry=false,
        onSubmitEditing=() => {}, 
        returnKeyType="default", 
        inputRef=null,
        blurOnSubmit=true,
        onChangeText,
        event 
    }) {

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    return (
        <TextInput
            style={[styleSelected.buttonSize, { backgroundColor: colors.BaseSlot1, flexDirection: "row", paddingLeft: 20 }]}
            placeholder={placeholder}
            placeholderTextColor="rgba(101, 101, 101, 0.5)"
            inputMode={inputMode}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            ref={inputRef}
            blurOnSubmit={blurOnSubmit}
            onChangeText={onChangeText}
            
            />
    )
}