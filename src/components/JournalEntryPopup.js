import React, { useEffect, useState, useRef } from 'react'
import { useColorScheme, View, TouchableOpacity, Pressable, Text, ScrollView, Modal, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
import RBSheet from 'react-native-raw-bottom-sheet'
import { useTranslation } from "react-i18next"


export default function JournalEntryPopup({
    item = { title: "Physiotherapy", category: "Physiotherapy", categoryColor: "orange", date: "18-06-2023", description: "Details details details details details details Details details details details details details Details details details details details details Details details details details details details Details details details details details details Details details details details details details Details details details details details details Details details details details details details" },
    event,
    openEntry,
    closeEntry
}) {

    const {t, i18n} = useTranslation()

    const [menuVisible, setMenuVisible] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const options = [
        {id: 1,name:(t("delete")), value:"delete", icon: "trash", iconType: "FontAwesome"},
    ]
    const refModalMenu = useRef()

    useEffect(() => {
    }, [])

    const openMenu = () => { setMenuVisible(true); console.log(menuVisible) }

    const closeMenu = () => { setMenuVisible(false); console.log("just closed") }

    const optionPressed = (val) => {
        if (val === "delete") {
            closeMenu()
            event(item.id)
            closeEntry()

        }
    }

    return (
        <View>
            <TouchableOpacity style={[styleSelected.modalOpenButton, {  position: "absolute" }]} onPress={() => { setModalVisible(true) }}><FontAwesome color={colors.BaseSlot1} size={40} name='plus' /></TouchableOpacity>
            <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} >
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => { event.target === event.currentTarget && closeEntry() }}>
                        <View style={{ flex: .33 }} />
                        <View style={[{

                            marginLeft: 20, marginRight: 20, borderRadius: 20,
                            backgroundColor: 'white', paddingTop: 15,
                            paddingBottom: 15, flex: .34
                        }]}>
                            <View style={{ flex: .08,  justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
                                <View style={{ flex: .9 }} />
                                <TouchableOpacity onPress={closeEntry}>
                                    <FontAwesome color={"#656565"} name='close' size={18} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: .92 }}>
                                {/* <View style={{width:"10%"}}></View> */}
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, padding: 20, paddingBottom:0 }}>
                                        <View style={{ flex:.2, flexDirection: "row",}}>
                                            <View style={{ flex: 1 }}>
                                                <ScrollView>
                                                    <Text style={{ fontSize: 17, fontWeight: 600 }}>{item.title}</Text>

                                                </ScrollView>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                    <TouchableOpacity onPress={() => {refModalMenu.current.open()}} style={{ alignItems: "center", justifyContent: "center", }}>
                                                        <MaterialCommunityIcons name='dots-horizontal' size={25} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: .2, flexDirection: "row"}}>
                                            <View style={{ justifyContent: "center", alignItems: "flex-start", flex: 1 }}>
                                                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: item.categoryColor, padding: 10, paddingTop: 5, paddingBottom: 5 }}>
                                                    <Text style={{ color: item.categoryColor }}>{item.category}</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                                <Text>{item.date}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex:.6}}>
                                            <ScrollView nestedScrollEnabled={true} >
                                                <Text>{item.description}</Text>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={{width:"10%"}}></View> */}

                            </View>
                        </View>
                        <View style={{ flex: .33 }} />
                    </Pressable>
                </Modal>

                <RBSheet
                    height={130}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#00000070"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        },
                        container: {
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            backgroundColor: "#030849"

                        }
                    }} ref={refModalMenu}>
                    <View style={{ flex: 1, padding: 25, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                        {/* <View style={{flexDirection: "row"}}>
                            <Text style={{color:"white", fontSize:14}}>{user.name}</Text>
                            <Image style={[{width: 35, height: 20, marginLeft: 10, tintColor:"white"}, ]} source={userType}/>
                        </View> */}
                        {options.map(list => (
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#D00", marginTop: 15, borderRadius: 10, height: 50 }}
                                    key={list.id}
                                    onPress={() => optionPressed(list.value)}
                                >
                                    <View style={{ flex: .5, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                        {list.iconType === "FontAwesome" && <FontAwesome style={{ fontSize: 26, color: "white" }} name={list.icon} />}
                                        {list.iconType === "MaterialCommunityIcons" && <MaterialCommunityIcons style={{ fontSize: 26, color: "white" }} name={list.icon} />}
                                    </View>
                                    <View style={{ flex: 2, height: "100%", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={[{ fontSize: 16, color: "white" }, list.iconType === "FontAwesome" && { marginLeft: 0 }]}>{list.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </RBSheet>
            </View>
        </View>
    )

}
