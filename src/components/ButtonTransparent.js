import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param titleBold: string - Text that will appear in the button in bold
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%"). Defaults to false
 * @param event: any
 */

export default function ButtonTransparent({ title, titleBold, fullWidth=false, event }) {
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
            style={[sizeStyleSelected, { backgroundColor: colors.BaseSlot1, flexDirection: "row" }]}>
            <Text style={styleSelected.textRegular16}>
                {title}
            </Text>
            <Text style={styleSelected.textBold16}>
                {titleBold}
            </Text>
        </TouchableOpacity>
    )
}