import React, {useState} from "react";
import { View,Text, Image, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import DropDownPicker from 'react-native-dropdown-picker'
import { FontAwesome } from "@expo/vector-icons"


/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param inputMode: string - Determines type of keyboard to open. Defaults to "text". Valid values: 'decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url'
 * @param secureTextEntry: boolean - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Defaults to false.
 * @param onSubmitEditing: function - Callback that is called when the text input's submit button is pressed.
 * @param returnKeyType: string - Determines how the return key looks. Valid values: 'default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call'. Defaults to 'default'
 * @param inputRef: React.MutableRefObject<undefined> - Allows getting a ref to the component instance. Defaults to null
 * @param blurOnSubmit: boolean - If true, closes the keyboard on pressing the submit button. Defaults to true
 * @param onChangeText: function - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param width: string or integer - Set element width. Defaults to "100%"
 * @param inputColor: string - Color of the input text
 * @param fontSize: integer - Size of the input text font
 * @param event: any
 */

export default function SelectTransparent(
    { 
        placeholder, 
        inputMode="text", 
        secureTextEntry=false,
        onSubmitEditing, 
        returnKeyType="default", 
        inputRef=null,
        blurOnSubmit=true,
        hasBorder=false,
        borderColor,
        backgroundColor,
        labelTextColor,
        onChangeText,
        fontSize=9,
        width = "100%",
        viewWidth = "100%",
        displaySelectedOption=false,
        align="left",
        marginLeft=0,
        event 
    }) {

    const [items, setItems] = useState([
        {label: 'Recent', value: 'apple'},
        {label: 'Old', value: 'banana'}
    ]);
    
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState({label: "Recent"})

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let inputStyles = { backgroundColor: colors.BaseSlot1, flexDirection: "row", paddingLeft: 20 } 
    let pickerStyles = {
        borderWidth: 0,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        minHeight: 30,
        borderRadius: 10,
        marginTop: 15,
        width: width
    }
    let textStyles = {
        color: labelTextColor,
        fontSize: 9
    }
    let alignStyle = {}
    let alignDropDownContainerStyle = {}
    if (hasBorder) {
        pickerStyles['borderWidth'] = 1
        inputStyles['borderWidth'] = 1
        inputStyles['borderColor'] = borderColor
    }
    if (fontSize) {
        inputStyles['fontSize'] = fontSize
    }
    if (align === "left") {
        alignStyle["alignSelf"] = "flex-start"       
        alignDropDownContainerStyle["marginTop"] = 15
        alignDropDownContainerStyle["borderRadius"] = 10
        alignDropDownContainerStyle["width"] = "61%"
        alignDropDownContainerStyle["borderColor"] = colors.BaseSlot2
    }
    if (align === "right") {
        alignStyle["alignSelf"] = "flex-end"
        alignDropDownContainerStyle["marginTop"] = 15
        alignDropDownContainerStyle["borderRadius"] = 10
        alignDropDownContainerStyle["width"] = "39%"
        alignDropDownContainerStyle["borderColor"] = colors.BaseSlot2
        alignDropDownContainerStyle["alignSelf"] = "flex-end"
    }
    const placeholderText = <Text style={textStyles}>{placeholder}{displaySelectedOption ? <Text style={{fontWeight: "bold"}}>{selectedValue.label}</Text> : ""}</Text>
    return (
        <View style={{marginLeft: marginLeft, width: viewWidth,}}>
            {/* <Text style={[styleSelected.textRegular13DarkBlue,{marginLeft: 20, marginTop: 25, zIndex: 999}]}>{placeholder + selectedValue.label} </Text> */}
            <DropDownPicker dropDownContainerStyle={alignDropDownContainerStyle} labelStyle={{color:"red"}} style={[alignStyle, pickerStyles]} placeholder={placeholderText} onSelectItem={(val) => {setSelectedValue(val); setOpen(false)}} onPress={() => {setOpen(!open)}} open={open} items={items} 
            ArrowDownIconComponent={() => {
                return <FontAwesome name="chevron-down" color={labelTextColor} />
            }}
            ArrowUpIconComponent={() => {
                return <FontAwesome name="chevron-up" color={labelTextColor} />
            }}
            />
        </View>
    )
}