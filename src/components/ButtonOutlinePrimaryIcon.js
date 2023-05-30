import React from "react";
import { Text, TouchableOpacity, useColorScheme, Image, View } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 */

export default function ButtonOutlinePrimaryIcon({ title, styleButton, styleText, styleImage, onPress, fullWidth=false, event }) {
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')
    const sizeStyleSelected = fullWidth ? styleSelected.buttonSizeFullWidthTextLeft : styleSelected.buttonSizeTextLeft
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[sizeStyleSelected, {borderWidth: 0.5, borderColor: colors.BaseSlot2, marginBottom: 20, }, styleButton]}>
                <View style={{flexDirection:"row", justifyContent: "space-between"}}>
            <Text style={[styleSelected.buttonOutlinePrimaryIconText, {marginLeft: 20}, styleText]}>
                {title}
            </Text><Image style={[{width: 35, height: 20, marginRight: 20}, styleImage]} source={require("../../assets/images/Healthprofessional.png")}/>

                </View>
        </TouchableOpacity>
    )
}