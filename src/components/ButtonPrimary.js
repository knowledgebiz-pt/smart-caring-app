import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 */

export default function ButtonPrimary({ title, fullWidth=false, event }) {
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
            style={[sizeStyleSelected, { backgroundColor: colors.BaseSlot2 }]}>
            <Text style={styleSelected.buttonPrimaryText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}