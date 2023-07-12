import React, {useState} from "react";
import { View,Text, Image, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import DropDownPicker from 'react-native-dropdown-picker'
import { FontAwesome } from "@expo/vector-icons"


/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param backgroundColor: string - Determine the background color of the select element
 * @param labelTextColor: string - Determine the color of the label text of the select element
 * @param fontSize: integer - Size of the input text font
 * @param width: string or integer - Set element width. Defaults to "100%"
 * @param viewWidth: string or integer - Set width of the view encompassing the element Defaults to "100%"
 * @param displaySelectedOption: boolean - Sets whether or not the current selected option should be displayed. Defaults to false
 * @param align: string - Sets element styles to align the element on the left of a view with flexDirection set to "row". Defaults to "left"
 * @param marginLeft: integer, float or string - Sets marginLeft property of the element's view
 * @param onPress: function - Callback triggered on pressing the select element
 * @param open: boolean - Sets whether select element is open or not
 * @param onSelectItem: function - Callback triggered on selecting an item from the dropdown list
 * @param selectedvalue: object - Currently selected value of the select element
 * @param ref: React.MutableRefObject<undefined> - Allows getting a ref to the component instance. Defaults to null
 * @param items: array - List of options for the select element's dropdown list
 * @param event: any
 */

export default function SelectTransparent(
    { 
        placeholder,
        hasBorder=false,
        borderColor,
        backgroundColor,
        labelTextColor,
        fontSize=9,
        width = "100%",
        viewWidth = "100%",
        displaySelectedOption=false,
        align="left",
        marginLeft=0,
        onPress,
        open,
        onSelectItem,
        selectedValue,
        ref,
        items,
        key2,
        event 
    }) {
    
    // const [open, setOpen] = useState(false)
    // const [selectedValue, setSelectedValue] = useState({label: "Recent"})

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
        alignDropDownContainerStyle["width"] = "95%"
        alignDropDownContainerStyle["borderColor"] = colors.BaseSlot2
    }
    if (align === "right") {
        alignStyle["alignSelf"] = "flex-end"
        alignDropDownContainerStyle["marginTop"] = 15
        alignDropDownContainerStyle["borderRadius"] = 10
        alignDropDownContainerStyle["width"] = "95%"
        alignDropDownContainerStyle["borderColor"] = colors.BaseSlot2
        alignDropDownContainerStyle["alignSelf"] = "flex-end"
    }
    const placeholderText = <Text style={textStyles}>{placeholder}{displaySelectedOption ? <Text style={{fontWeight: "bold"}}>{selectedValue.label}</Text> : ""}</Text>
    return (
        <View ref={ref} style={{marginLeft: marginLeft, width: "50%",}}>
            {/* <Text style={[styleSelected.textRegular13DarkBlue,{marginLeft: 20, marginTop: 25, zIndex: 999}]}>{placeholder + selectedValue.label} </Text> */}
            <DropDownPicker listMode="SCROLLVIEW" key={key2} dropDownContainerStyle={alignDropDownContainerStyle} labelStyle={{color:"red"}} style={[alignStyle, pickerStyles]} placeholder={placeholderText} onSelectItem={onSelectItem} onPress={onPress} open={open} items={items} 
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