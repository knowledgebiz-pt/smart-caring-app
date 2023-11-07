import { React } from "react";
import { Text, TouchableOpacity, useColorScheme, Image, View } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param title: string - Text that will appear in the button
 * @param styleButton: object - Style to apply to TouchableOpacity component
 * @param styleText: object - Style to apply to button Text component
 * @param styleImage: object - Style to apply to icon Image component
 * @param onPress: function - Callback triggered on pressing the TouchableOpacity component
 * @param fullWidth: boolean - If true, will use buttonSizeFullWidth style (width: "100%") instead of buttonSize style (width: "80%")
 * @param event: any
 */

export default function ButtonOutlineSuccessIcon({ title, styleButton, styleText, styleImage, fullWidth=false, onPress, event }) {
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')
    const sizeStyleSelected = fullWidth ? styleSelected.buttonSizeFullWidthTextLeft : styleSelected.buttonSizeTextLeft 
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[sizeStyleSelected, {borderWidth: 0.5, borderColor: colors.BaseSlot4, marginBottom: 20, }, styleButton]}>
                <View style={{flexDirection:"row", justifyContent: "space-between"}}>
            <Text style={[styleSelected.buttonOutlineSuccessIconText, { marginLeft: 20}, styleText]}>
                {title}
            </Text><Image style={[{width: 35, height: 20, marginRight: 20}, styleImage]} source={require("../../assets/images/Caregiver.png")}/>

                </View>
        </TouchableOpacity>
    )
}