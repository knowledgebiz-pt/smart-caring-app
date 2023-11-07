import React from 'react'
import { useColorScheme, View, TouchableOpacity, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { useTranslation } from "react-i18next"

export default function ThreeOptionBar({
    indexSelected,
    onPressLeft,
    onPressCenter,
    onPressRight,
    textLeft,
    textCenter,
    textRight
}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    return (
        <View style={{ height: 40, borderColor: colors.BaseSlot5, borderWidth: .5, width: "90%", borderRadius: 40, flexDirection: "row" }}>

            <TouchableOpacity
                onPress={onPressLeft}
                style={{ borderRightWidth: .5, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", borderTopLeftRadius: indexSelected == 0 ? 20 : 0, borderBottomLeftRadius: indexSelected == 0 ? 20 : 0, backgroundColor: indexSelected == 0 ? colors.BaseSlot6 : "transparent" }}>
                <Text style={[{ fontSize:13, color: indexSelected == 0 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{textLeft}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPressCenter}
                style={{ borderRightWidth: .5, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: indexSelected == 1 ? colors.BaseSlot2 : "transparent" }}>
                <Text style={[{ fontSize:13, color: indexSelected == 1 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{textCenter}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPressRight}
                style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: indexSelected == 2 ? colors.BaseSlot4 : "transparent" }}>
                <Text style={[{ fontSize:13, color: indexSelected == 2 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{textRight}</Text>
            </TouchableOpacity>

        </View>
    )

}
