import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 */

export default function ButtonOutlinePrimary({ title, fullWidth=false, event }) {
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')
    const sizeStyleSelected = fullWidth ? styleSelected.buttonSizeFullWidth : styleSelected.buttonSize
    return (
        <TouchableOpacity
            onPress={() => {
                if (typeof event == "function")
                    event()
            }}
            style={[sizeStyleSelected, {borderWidth: 2, borderColor: colors.BaseSlot2 }]}>
            <Text style={styleSelected.buttonOutlinePrimaryText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}