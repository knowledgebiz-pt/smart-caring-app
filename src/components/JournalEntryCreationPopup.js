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


export default function JournalEntryCreationPopup({
    blurOnSubmit,
    onSubmitEditing,
    hasBorder,
    borderColor,
    placeholder,
    img,
    userId,
    event
}) {
    const [modalVisible, setModalVisible] = useState(false)
    const refModalMenu = useRef()

    const [categoryDialogVisible, setCategoryDialogVisible] = useState(false)

    const [title, setTitle] = useState(null)
    const [category, setCategory] = useState(null)
    const [content, setContent] = useState(null)

    const [entry, setEntry] = useState({title: null, description: null, category: null, categoryColor: null, date: `${new Date().getDate().toString().padStart(2, "0")}-${(new Date().getMonth()+1).toString().padStart(2, "0")}-${new Date().getFullYear()}`})

    const [newCategory, setNewCategory] = useState({ label: null, value: null, color: null, icon: () => <FontAwesome name='circle' color={"black"} /> })

    //dropdown picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Add a new category', value: 'newCat', icon: () => <FontAwesome name='circle' color={"gray"} /> },

        { label: 'Spain', value: 'spain', color:"red", icon: () => <FontAwesome name='circle' color={"red"} /> },
        { label: 'Madrid', value: 'madrid', color:"blue", parent: 'spain' },
        { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

        { label: 'Italy', value: 'italy' },
        { label: 'e', value: 'e', parent: 'italy' },
        { label: 'a', value: 'a', parent: 'italy' },
        { label: 'b', value: 'b', parent: 'italy' },
        { label: 'c', value: 'c', parent: 'italy' },
        { label: 'd', value: 'd', parent: 'italy' },
        { label: 'f', value: 'f', parent: 'italy' },


        { label: 'Finland', value: 'finland' },

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

    const checkValue = (val) => {
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
            <DialogInput isDialogVisible={categoryDialogVisible}
                title={"URL Link"}
                message={"Please insert the whole url to the webpage you wish to link to in your post, including either \"https://\" or \"http://\" :"}
                hintInput={"Category"}
                submitInput={(inputText) => { setCategory(inputText) }}
                closeDialog={() => { setCategoryDialogVisible(false) }} />
            <TouchableOpacity style={styleSelected.journalEntryCreationOpenButton} onPress={() => { setModalVisible(true) }}><FontAwesome color={colors.BaseSlot1} size={40} name='plus' /></TouchableOpacity>
            <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} visible={modalVisible} statusBarTranslucent={true}>
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
                                <Text style={{fontSize: 18, fontWeight: 600, color:"#1CA3FC"}}>Create entry</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: .05 }} />
                                <View style={{ flex: .9 }}>
                                    <View style={{ justifyContent: "center", marginTop: 20, flex:.15 }}>
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>Title</Text>
                                        <TextInput
                                            style={[styleSelected.buttonSizeFullWidth, { borderWidth: .5, borderColor:"#A8A8A8", paddingLeft: 10, borderRadius: 20 }]}
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
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>Category</Text>
                                        {/* <TextInput
                                            style={[styleSelected.buttonSizeFullWidth, { borderWidth: 1, paddingLeft: 10, borderRadius: 20 }]}
                                            placeholderTextColor="rgba(101, 101, 101, 0.5)"
                                            inputMode={'text'}
                                        /> */}
                                        <DropDownPicker
                                            style={{ borderRadius: 20, borderWidth: .5, borderColor: "#A8A8A8" }}
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
                                                borderColor:"#A8A8A8",
                                                borderRadius:20
                                            }}
                                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                                        />

                                    </View>
                                    <View style={{ flex:.3, marginTop: 20 }}>
                                        <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 10, marginBottom: 5, fontWeight: 600 }]}>Content</Text>
                                        <TextInput
                                        onChangeText={(val) => setEntry({title: entry.title, category: entry.category, categoryColor: entry.categoryColor, date: entry.date, description: val})}
                                            style={[styleSelected.postInputSize, { borderWidth: .5, paddingLeft: 10, borderRadius: 20, width: "100%", marginTop: 0, borderColor:"#A8A8A8" }]}
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
                                        <ButtonPrimary fullWidth={false} title={"Submit"} event={() => { console.log("=====?");event(entry);setModalVisible(false)}} />
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
                        <Text style={{ fontSize: 18, fontWeight: 600, color:"#1CA3FC" }}>Create category</Text>
                    </View>
                    <View style={{ flex: .9, paddingTop: 25, paddingLeft: 25, paddingRight: 25, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                        <View style={{ flex: .3 }}>
                            <InputTransparentLabelAbove borderColor={"#A8A8A8"} onChangeText={(text) => { setNewCategory({ label: text, value: text, color: newCategory.color, icon: newCategory.icon }) }} hasBorder={1} fullWidth={true} inputMode='text' placeholder={"Category name"} />
                        </View>
                        <View style={{ flex: .5, zIndex: 9999, }}>
                            <Text style={[styleSelected.textRegular13DarkBlue, { marginLeft: 20, marginBottom: 5 }]}>Color</Text>
                            <DropDownPicker
                                style={{ borderRadius: 20, borderColor:"#A8A8A8",}}
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
                                    borderColor:"#A8A8A8",
                                }}
                                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                            />
                        </View>
                        <View style={{ flex: .2, alignItems: "center", paddingBottom: 15 }}>
                            <ButtonPrimary event={() => { setCategory(newCategory); let newItems = [...items]; newItems.push(newCategory); setItems(newItems) }} fullWidth={true} title={"Submit"} />
                        </View>
                    </View>
                </RBSheet>
            </View>
        </KeyboardAvoidingView>
    )

}
