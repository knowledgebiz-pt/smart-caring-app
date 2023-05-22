import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

export default function ButtonTransparent({ title, titleBold, event }) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    return (
        <TouchableOpacity
            onPress={() => {
                if (typeof event == "function")
                    event()
            }}
            style={[styleSelected.buttonSize, { backgroundColor: colors.Base_Slot_1, flexDirection: "row" }]}>
            <Text style={styleSelected.textRegular16}>
                {title}
            </Text>
            <Text style={styleSelected.textBold16}>
                {titleBold}
            </Text>
        </TouchableOpacity>
    )
}