import React, { useEffect, useState } from 'react'
import { useColorScheme, Alert, View, TouchableOpacity, Modal, Pressable, Text, TextInput, ScrollView } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
import JournalEntryPopup from './JournalEntryPopup'


export default function JournalEntry({
    item,
    index,
    event
}) {
    const [modalVisible, setModalVisible] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
    }, [])

    return (
        <>
            {modalVisible && <JournalEntryPopup event={event} item={item} closeEntry={() => setModalVisible(false)} />}
            <View style={{ flex: 1, marginLeft: "5%", marginRight: "5%" }}>
                {index === 0 && <View style={{ borderTopWidth: .5 }}></View>}
                <TouchableOpacity onPress={() => {setModalVisible(true)}} style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 20 }}>
                    <View style={{ flex: .40, flexDirection: "column" }}>
                        <Text style={{ fontWeight: 600, justifyContent: "center", alignItems: "center", }}>{item.title}</Text>
                        <Text>{item.date}</Text>
                    </View>
                    <View style={{ flex: .20 }}></View>
                    <View style={{ flex: .40, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ borderWidth: 1, borderRadius: 30, borderColor: item.categoryColor, padding: 10, paddingTop: 5, paddingBottom: 5 }}>
                            <Text style={{ color: item.categoryColor }}>{item.category}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ borderTopWidth: .5, }}></View>
            </View>
        </>
    )

}
