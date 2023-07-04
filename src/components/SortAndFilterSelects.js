
import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import SelectTransparent from "./SelectTransparent";

/***
 * @param onSelectSort: function - Callback called when a value is chosen for the sort select
 * @param onSelectFilter: function - Callback called when a value is chosen for the filterSelect
 * @param sortValue: object - Current value of the sort select
 * @param filtervalue: object - Current value of the filter select
 * @param sortItems: array - Options for the sort select
 * @param filterItems: array - Options for the filter select
 * @param event: any
 */

export default function SortAndFilterSelects(
    {
        onSelectSort,
        onSelectFilter,
        sortValue,
        filterValue,
        sortItems,
        filterItems,
        event
    }) {
        
    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [filterSelectOpen, setFilterSelectOpen] = useState(false)

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    
    return (
        <View style={{flexDirection: "row", width: "90%", alignSelf: "center", paddingBottom:5, zIndex: 9999}}>
            <SelectTransparent items={sortItems} onPress={() => {setSortSelectOpen(!sortSelectOpen); setFilterSelectOpen(false)}} onSelectItem={onSelectSort} selectedValue={sortValue} open={sortSelectOpen} placeholder={"Sort by: "} hasBorder={1} displaySelectedOption={true} labelTextColor={colors.BaseSlot2} borderColor={colors.BaseSlot2} viewWidth="50%" width='61%' align='left' />
            <SelectTransparent items={filterItems} onPress={() => {setSortSelectOpen(false); setFilterSelectOpen(!filterSelectOpen)}} onSelectItem={onSelectFilter} selectedValue={filterValue} open={filterSelectOpen} placeholder={"Filters"} displaySelectedOption={false} labelTextColor={colors.BaseSlot1} backgroundColor={colors.BaseSlot2} hasBorder={false} viewWidth="50%" width='39%' align='right'  />
        </View>
    )
}