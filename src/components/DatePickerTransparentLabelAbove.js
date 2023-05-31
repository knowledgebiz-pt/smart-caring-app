import React, {useState} from "react";
import { View,Text, TouchableOpacity, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param date: Date - Value for date picker
 * @param showPicker: boolean - Display the date picker when true. Default is false
 * @param onDateChange: function - Function that will execute when a date is chosen in the date picker
 * @param viewWidth: string or integer - width of the View element. Defaults to "100%"
 * @param event: any
 */

export default function DatePickerTransparentLabelAbove(
    { 
        placeholder,
        date=new Date(),
        showPicker=false,
        onDateChange,
        viewWidth="100%",
        event 
    }) {

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    return (
        <View style={{width: viewWidth}}>
            <Text style={[styleSelected.textRegular13DarkBlue,{marginLeft: 20, marginBottom: 5}]}>{placeholder}</Text>
            <TouchableOpacity
            onPress={() => {
                if (typeof event == "function")
                    event()
            }}
            style={[styleSelected.datePickerButton]}>
            <Text style={styleSelected.textRegular13Gray}>
                {date.getFullYear()}
            </Text>
        </TouchableOpacity>
            {showPicker && (<DateTimePicker
            value={date}
            onChange={onDateChange}
            
            
            />)}
        </View>
    )
}