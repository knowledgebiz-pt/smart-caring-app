import React from "react";
import { Text, View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

export default function Loader() {
    const colors = require("../../style/Colors.json")
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    return (
        <View style={styleSelected.backgroundLoader}>
            <Text>Loading...</Text>
        </View>
    )
}