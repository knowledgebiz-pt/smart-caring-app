
import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import SelectTransparent from "./SelectTransparent";
import { useTranslation } from "react-i18next"

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

    const {t, i18n} = useTranslation()

    //placeholder: 
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    
    return (
        <View style={{flexDirection: "row", width: "90%", alignSelf: "center", paddingBottom:5, zIndex: 9999}}>
            <SelectTransparent key={"select1"} key2={"select1"} items={sortItems} onPress={() => {setSortSelectOpen(!sortSelectOpen); setFilterSelectOpen(false); console.log("code executed")}} onSelectItem={(val) => {onSelectSort(val); setSortSelectOpen(false)}} selectedValue={sortValue} open={sortSelectOpen} placeholder={t("sort_by")+": "} hasBorder={1} displaySelectedOption={true} labelTextColor={colors.BaseSlot2} borderColor={colors.BaseSlot2} viewWidth="50%" width='95%' align='left' />
            {/* <SelectTransparent key={"select2"} key2={"select2"} items={filterItems} onPress={() => {setSortSelectOpen(false); setFilterSelectOpen(!filterSelectOpen)}} onSelectItem={(val) =>{onSelectFilter(val); setFilterSelectOpen(false)}} selectedValue={filterValue} open={filterSelectOpen} placeholder={t("filters")} displaySelectedOption={false} labelTextColor={colors.BaseSlot1} backgroundColor={colors.BaseSlot2} hasBorder={false} viewWidth="50%" width='95%' align='right'  /> */}
        </View>
    )
}