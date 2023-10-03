import React, { useEffect, useState, useRef } from 'react'
import { useColorScheme, View, TouchableOpacity, Modal, Pressable, Text, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import PostInputTransparent from './PostInputTransparent'
import { FontAwesome } from "@expo/vector-icons"
import InputTransparentLabelAbove from './InputTransparentLabelAbove'
import DropDownPicker from 'react-native-dropdown-picker';
import DialogInput from 'react-native-dialog-input';
import ModalMenu from '../components/ModalMenu'
import RBSheet from 'react-native-raw-bottom-sheet'
import ButtonPrimary from './ButtonPrimary'

import { useTranslation } from "react-i18next"
import { NewsService, UserService } from 'smart-caring-client/client'


export default function JournalEntryCreationPopup({
    blurOnSubmit,
    onSubmitEditing,
    hasBorder,
    borderColor,
    placeholder,
    img,
    userId,
    event,
    setModalVisible,
    visible
}) {
    const {t, i18n} = useTranslation()
    
    // const [modalVisible, setModalVisible] = useState(false)
    const refModalMenu = useRef()

    const [title, setTitle] = useState(null)
    const [category, setCategory] = useState(null)
    const [content, setContent] = useState(null)

    const [entry, setEntry] = useState({title: null, description: null, category: null, categoryColor: null, date: `${new Date().getDate().toString().padStart(2, "0")}-${(new Date().getMonth()+1).toString().padStart(2, "0")}-${new Date().getFullYear()}`})

    const [newCategory, setNewCategory] = useState({ label: "", value: null, color: null, icon: () => <FontAwesome name='circle' color={"black"} /> })

    //dropdown picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: t('journal_entry_add_category'), value: 'newCat', icon: () => <FontAwesome name='circle' color={"gray"} /> },

        { label: 'Category 1', value: 'cat1', color:"red", icon: () => <FontAwesome name='circle' color={"red"} /> },
        { label: 'Category 2', value: 'cat2', color:"blue", icon: () => <FontAwesome name='circle' color={"blue"} />},
        { label: 'Category 3', value: 'cat3', color:"green", icon: () => <FontAwesome name='circle' color={"green"} />},
        { label: 'Category 4', value: 'cat4', color:"yellow", icon: () => <FontAwesome name='circle' color={"yellow"} /> },
        { label: 'Category 5', value: 'cat5', color:"pink", icon: () => <FontAwesome name='circle' color={"pink"} /> },

    ]);

    const [openColorItems, setOpenColorItems] = useState(false);
    const [valueColorItems, setValueColorItems] = useState(null);
    const [colorItems, setColorItems] = useState([
        { label: 'Red', value: 'red', icon: () => <FontAwesome name='circle' color={"red"} /> },
        { label: 'Green', value: 'green', icon: () => <FontAwesome name='circle' color={"green"} /> },
        { label: 'Blue', value: 'blue', icon: () => <FontAwesome name='circle' color={"blue"} /> },
        { label: 'Red', value: 'red1', icon: () => <FontAwesome name='circle' color={"red"} /> },
        { label: 'Green', value: 'green1', icon: () => <FontAwesome name='circle' color={"green"} /> },
        { label: 'Blue', value: 'blue1', icon: () => <FontAwesome name='circle' color={"blue"} /> },
        { label: 'Red', value: 'red2', icon: () => <FontAwesome name='circle' color={"red"} /> },
        { label: 'Green', value: 'green2', icon: () => <FontAwesome name='circle' color={"green"} /> },
        { label: 'Blue', value: 'blue2', icon: () => <FontAwesome name='circle' color={"blue"} /> },
    ])



    // ----
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {

    }, [])

    const handleSubmit = (form) => {
        if (form === "entryForm") {
            if (entry.category !== null && entry.category.value !== "newCat" && entry.title !== null) {
                event(entry);
                setModalVisible(false)
            }
        }
        else if (form === "categoryForm") {
            if (newCategory.label.trim().length > 0 && newCategory.color !== null) {
                setCategory(newCategory);
                let newItems = [...items]; 
                newItems.push(newCategory); 
                setItems(newItems); 
                refModalMenu.current.close()
            }
        }
    }

    const checkValue = (val) => {

        UserService.getUserDataByIdUser("teste@", "123").then((res) => {
                
        }).catch((err) => {console.error(err)})

        console.log(val)
        if (val === "newCat") {
            refModalMenu.current.open()
        }
        else {
            let chosenCategoryIndex = items.findIndex(x =>{return x.value === val})
            console.log(chosenCategoryIndex)

            setEntry({title: entry.title, category: items[chosenCategoryIndex].label, categoryColor: items[chosenCategoryIndex].color, date: entry.date, description: entry.description})
        }
    }

    return (
        <KeyboardAvoidingView style={{ paddingTop: 10 }}>
            {/* <TouchableOpacity style={styleSelected.journalEntryCreationOpenButton} onPress={() => { setModalVisible(true) }}><FontAwesome color={colors.BaseSlot1} size={40} name='plus' /></TouchableOpacity> */}
            <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} visible={visible} statusBarTranslucent={true}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => event.target === event.currentTarget && setModalVisible(false)}>
                        <View style={[{
                            flex: 1, marginBottom: 100, marginTop: 50,
                            marginLeft: 20, marginRight: 20, borderRadius: 20,
                            backgroundColor: 'white', paddingTop: 35,
                            paddingBottom: 35,
                        }]}>
                            <View style={{ flex: 1, position: "absolute", right: 20, top: 20, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)}><FontAwesome name='close' size={15} /></TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", }}>
                                <Text style={{fontSize: 18, fontWeight: 600, color:"#1CA3FC"}}>{t("journal_create_entry")}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: .05 }} />
                                <View style={{ flex: .9 }}>
                                    <View style={{ justifyContent: "center", marginTop: 20, flex:.15 }}>
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>{t("title")}</Text>
                                        <TextInput
                                            style={[styleSelected.buttonSizeFullWidth, { borderWidth: .5, borderColor:colors.BaseSlot5, paddingLeft: 10, borderRadius: 20 }]}
                                            // style={[sizeStyleSelected, inputStyles]}
                                            placeholderTextColor="rgba(101, 101, 101, 0.5)"
                                            inputMode={'text'}
                                            onChangeText={(val) => {setEntry({title: val, category: entry.category, categoryColor: entry.categoryColor, date: entry.date, description: entry.description})}}
                                        // onSubmitEditing={onSubmitEditing}
                                        // returnKeyType={returnKeyType}
                                        // ref={inputRef}
                                        // blurOnSubmit={blurOnSubmit}
                                        // onChangeText={onChangeText}
                                        // value={value}       
                                        />

                                    </View>
                                    <View style={{ flex:.30, marginTop: 20, zIndex: 898887 }}>
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>{t("category")}</Text>
                                        {/* <TextInput
                                            style={[styleSelected.buttonSizeFullWidth, { borderWidth: 1, paddingLeft: 10, borderRadius: 20 }]}
                                            placeholderTextColor="rgba(101, 101, 101, 0.5)"
                                            inputMode={'text'}
                                        /> */}
                                        <DropDownPicker
                                            style={{ borderRadius: 20, borderWidth: .5, borderColor: colors.BaseSlot5 }}
                                            placeholder={t("journal_entry_category_placeholder")}
                                            onChangeValue={(val) => { checkValue(val) }}
                                            searchable={false}
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                            showBadgeDot={true}
                                            multiple={false}
                                            mode="BADGE"
                                            listMode="SCROLLVIEW"
                                            scrollViewProps={{
                                                nestedScrollEnabled: true,
                                            }}
                                            dropDownContainerStyle={{
                                                position: 'relative',
                                                top: -2,
                                                height: 100,
                                                borderWidth: .5,
                                                borderColor:colors.BaseSlot5,
                                                borderRadius:20
                                            }}
                                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                                        />

                                    </View>
                                    <View style={{ flex:.3, marginTop: 20 }}>
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>{t("content")}</Text>
                                        <TextInput
                                        onChangeText={(val) => setEntry({title: entry.title, category: entry.category, categoryColor: entry.categoryColor, date: entry.date, description: val})}
                                            style={[styleSelected.postInputSize, { borderWidth: .5, paddingLeft: 10, borderRadius: 20, width: "100%", marginTop: 0, borderColor:colors.BaseSlot5 }]}
                                            numberOfLines={6}
                                            scrollEnabled={true}
                                            multiline={true}
                                            // style={[sizeStyleSelected, inputStyles]}
                                            placeholderTextColor="rgba(101, 101, 101, 0.5)"
                                            inputMode={'text'}
                                        // onSubmitEditing={onSubmitEditing}
                                        // returnKeyType={returnKeyType}
                                        // ref={inputRef}
                                        // blurOnSubmit={blurOnSubmit}
                                        // onChangeText={onChangeText}
                                        // value={value}       
                                        />

                                    </View>
                                    <View style={{ flex: .25, justifyContent: "center" }}>
                                        <ButtonPrimary fullWidth={false} title={t("submit")} event={() => { handleSubmit("entryForm");}} />
                                    </View>
                                </View>
                                <View style={{ flex: .05 }} />
                            </View>
                        </View>
                    </Pressable>
                </Modal>
                <RBSheet
                    height={430}
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

                        }
                    }} ref={refModalMenu}>
                    <View style={{ flex: .1, paddingLeft: 25, paddingRight: 25, paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: 600, color:"#1CA3FC" }}>{t("journal_create_category")}</Text>
                    </View>
                    <View style={{ flex: .9, paddingTop: 25, paddingLeft: 25, paddingRight: 25, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                        <View style={{ flex: .3 }}>
                            <InputTransparentLabelAbove borderColor={colors.BaseSlot5} onChangeText={(text) => { setNewCategory({ label: text, value: text, color: newCategory.color, icon: newCategory.icon }) }} hasBorder={1} fullWidth={true} inputMode='text' placeholder={t("journal_category_name")} />
                        </View>
                        <View style={{ flex: .5, zIndex: 9999, }}>
                            <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 20, marginBottom: 5 }]}>{t("color")}</Text>
                            <DropDownPicker
                                style={{ borderRadius: 20, borderColor:colors.BaseSlot5,}}
                                onChangeValue={(val) => { setNewCategory({ label: newCategory.label, value: newCategory.value, color: val, icon: () => <FontAwesome name='circle' color={val} /> }) }}
                                searchable={false}
                                open={openColorItems}
                                value={valueColorItems}
                                items={colorItems}
                                setOpen={setOpenColorItems}
                                setValue={setValueColorItems}
                                setItems={setColorItems}
                                showBadgeDot={true}
                                multiple={false}
                                placeholder={t("journal_category_color")}
                                mode="BADGE"
                                listMode="SCROLLVIEW"
                                dropDownDirection='BOTTOM'
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                dropDownContainerStyle={{
                                    position: 'relative',
                                    top: -2,
                                    maxHeight: 100,                                    
                                    borderColor:colors.BaseSlot5,
                                }}
                                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                            />
                        </View>
                        <View style={{ flex: .2, alignItems: "center", paddingBottom: 15 }}>
                            <ButtonPrimary event={() => { handleSubmit("categoryForm") }} fullWidth={true} title={t("submit")} />
                        </View>
                    </View>
                </RBSheet>
            </View>
        </KeyboardAvoidingView>
    )

}
