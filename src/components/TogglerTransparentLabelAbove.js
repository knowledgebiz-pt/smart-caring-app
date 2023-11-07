import React from "react";
import { View,Text, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import SwitchSelector from "react-native-switch-selector"
/***
 * @param label: string - Text that will appear as over the input as its label
 * @param optionOneLabel: string - Text that will determine the label of the first option
 * @param optionOneValue: string - Value of the first option
 * @param optionTwoLabel: string - Text that will determine the label of the second option
 * @param optionTwoValue: string - Value of the second option
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 * @param inputColor: string - Color of the input text
 * @param fontSize: integer - Size of the input text font
 * @param onPress: function - Function that will execute on pressing the component
 * @param viewWidth: string or integer - width of the View element. Defaults to "100%"
 * @param initial: integer - initial option to be displayed. Defaults to 0
 * @param event: any
 */

export default function TogglerTransparentLabelAbove(
    { 
        label,
        optionOneLabel,
        optionOneValue,
        optionTwoLabel,
        optionTwoValue,
        hasBorder=false,
        borderColor,
        fullWidth=false,
        inputColor,
        fontSize,
        onPress,
        viewWidth="100%",
        initial=0,
        event 
    }) {

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
        <View style={{width: viewWidth}}>
            <Text style={[styleSelected.textRegular13DarkBlue,{marginLeft: 20, marginBottom: 5}]}>{label}</Text>
            <SwitchSelector 
                borderColor={colors.BaseSlot5}
                style={[sizeStyleSelected, inputStyles]}
                textColor={colors.BaseSlot3}
                buttonColor={colors.BaseSlot5}
                options={[{label: optionOneLabel, value: optionOneValue,}, {label: optionTwoLabel, value: optionTwoValue}]}
                initial={initial}
                onPress={onPress}/>
        </View>
    )
}