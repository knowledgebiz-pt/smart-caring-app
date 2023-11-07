import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 * @param fontSize: integer - Size of text font
 * @param borderRadius: integer - Border radius of TouchableOpacity component
 * @param event: any
 * @param height: integer or string - Height of TouchableOpacity component. Defaults to 50 if null or undefined
 * @param textAlign: string - Alignment of text in Text component. Defaults to "auto"
 */

export default function ButtonSuccess({ title, fullWidth=false, fontSize=16, borderRadius=30, event, height, textAlign="auto" }) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const sizeStyleSelected = fullWidth ? styleSelected.buttonSizeFullWidth : styleSelected.buttonSize
    return (
        <TouchableOpacity
            onPress={() => {
                if (typeof event == "function")
                    event()
            }}
            style={[sizeStyleSelected, { backgroundColor: colors.BaseSlot4, borderRadius }, {height: (height != undefined || height != null) ? height: 50}]}>
            <Text style={[styleSelected.buttonPrimaryText, {fontSize, textAlign}]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}