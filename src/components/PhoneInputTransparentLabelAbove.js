import React from "react";
import { View,Text, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import PhoneInput from 'react-native-phone-number-input'

/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param placeholder: string - Text that will appear as placeholder value in the input field
 * @param onChangeText: function - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 * @param inputColor: string - Color of the input text
 * @param fontSize: integer - Size of the input text font
 * @param event: any
 * @param value: string - value of input
 */

export default function PhoneInputTransparentLabelAbove(
    { 
        placeholder,
        placeholderValue="",
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
            <PhoneInput
                defaultValue={value}
                containerStyle={[sizeStyleSelected, inputStyles]}
                textContainerStyle={styleSelected.phoneInputTextContainer}
                textInputStyle={[styleSelected.phoneInputTextInput, styleSelected.textRegular13Gray]}
                codeTextStyle={styleSelected.phoneInputCodeText}
                countryPickerButtonStyle={styleSelected.phoneInputCountryPickerButton}
                placeholder={placeholderValue}
                onChangeFormattedText={onChangeText}
                defaultCode="PT"
            />
        </View>
    )
}