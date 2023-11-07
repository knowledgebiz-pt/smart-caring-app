import React from 'react'
import { useColorScheme, View } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { FontAwesome } from "@expo/vector-icons"
import DropDownPicker from 'react-native-dropdown-picker'

export default function SingleSelect({
    dropDownContainerStyle,
    styleDropdown,
    placeholder,
    onSelectItem,
    onPress,
    open,
    items
}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", }}>
                <DropDownPicker listMode="SCROLLVIEW" key={"key1"} 
                    dropDownContainerStyle={dropDownContainerStyle} 
                    style={styleDropdown}
                    placeholder={placeholder} 
                    onSelectItem={onSelectItem} 
                    onPress={onPress} 
                    open={open} items={items}
                    ArrowDownIconComponent={() => {
                        return <FontAwesome name="chevron-down" color={colors.BaseSlot5} />
                    }}
                    ArrowUpIconComponent={() => {
                        return <FontAwesome name="chevron-up" color={colors.BaseSlot5} />
                    }}
                />
            </View>
        </View>
    )

}



