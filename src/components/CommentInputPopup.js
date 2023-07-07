import React, { useEffect, useState } from 'react'
import { useColorScheme, View, TouchableOpacity, Modal, Pressable } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import PostInputTransparent from './PostInputTransparent'
import { FontAwesome } from "@expo/vector-icons"
import { NewsService, CommentService } from 'smart-caring-client/client'


export default function CommentInputPopup({ 
    blurOnSubmit,
    hasBorder,
    borderColor,
    placeholder,
    img,
    userId,
    newsId,
    modalVisible,
    closeModal,
    onSubmitEditing,
    event 
}) {
    // const [modalVisible, setModalVisible] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json') 

    useEffect(() => {

     }, [])

    return (
        <View style={{paddingTop: 10}}>
            <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} visible={modalVisible}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={closeModal}>
                        <View style={styleSelected.modalView}>
                            <PostInputTransparent onSubmitEditing={onSubmitEditing} showButtons={false} userId={userId} newsId={newsId} blurOnSubmit={blurOnSubmit} img={img} hasBorder={hasBorder} borderColor={borderColor} placeholder={placeholder}/>
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </View>
    )
    
}
