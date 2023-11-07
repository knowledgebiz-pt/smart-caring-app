import React from 'react'
import { useColorScheme, View } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { FontAwesome } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import SearchInput from './SearchInput'

export default function SearchBar({
    searchText,
    onChangeText,
    viewStyle={ borderWidth: .5, width: "90%", flexDirection: "row", borderRadius: 30, padding: 3 }
}) {
    const { t, i18n } = useTranslation()
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    viewStyle["borderColor"] = colors.BaseSlot5

    return (
        <View style={viewStyle}>
            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                <FontAwesome size={15} color={colors.BaseSlot5} name='search' />
            </View>
            <SearchInput value={searchText} placeholder={t("search")} onChangeText={onChangeText} />
        </View>
    )

}
