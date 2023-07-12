import React, { useEffect, useState } from 'react'
import { useColorScheme, View, TouchableOpacity, Modal, Pressable } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import PostInputTransparent from './PostInputTransparent'
import { FontAwesome } from "@expo/vector-icons"


export default function PostInputPopup({ 
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
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json') 

    useEffect(() => {

     }, [])

    return (
        <View style={{paddingTop: 10}}>
            <TouchableOpacity style={styleSelected.modalOpenButton} onPress={() => {setModalVisible(true)}}><FontAwesome color={colors.BaseSlot1} size={40} name='plus' /></TouchableOpacity>
            <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} visible={modalVisible}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => event.target === event.currentTarget && setModalVisible(false)}>
                        <View style={styleSelected.modalView}>
                            <PostInputTransparent event={() => setModalVisible(false)} onSubmitEditing={onSubmitEditing} userId={userId} blurOnSubmit={blurOnSubmit} img={img} hasBorder={hasBorder} borderColor={borderColor} placeholder={placeholder}/>
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </View>
    )
    
}
