import React, { useEffect, useState, useRef } from 'react'
import { useColorScheme, View, TouchableOpacity, Modal, Pressable, Image, Text, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome } from "@expo/vector-icons"
import Toast from 'react-native-toast-message'

import RBSheet from 'react-native-raw-bottom-sheet'

export default function ModalMenu({ref}) {

    
    // const [modalVisible, setModalVisible] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {

    }, [])

    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    return (
        <>
            <View style={[styleSelected.feedPostContainer, { zIndex: 99999999 }]}>
                <RBSheet ref={ref}>
                    <View style={{flex:1,padding:25}}>
                        <Text style={{fontSize:16,marginBottom:20,color:"#777"}}>Create</Text>
                        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",paddingVertical:10}}>
                            <FontAwesome name='angle-right' style={{fontSize:26,color:"#777",width:60}} />
                            <Text style={{fontSize:16}}>Label</Text>
                        </TouchableOpacity>
                        {/* {data.lists.map(list => (
                        <TouchableOpacity
                            key={list.icon}
                            style={styles.listButton}
                            onPress={() => this.Standard.close()}
                        >
                            <MDIcon name={list.icon} style={styles.listIcon} />
                            <Text style={styles.listLabel}>{list.label}</Text>
                        </TouchableOpacity> */}
                        
                    </View>
                </RBSheet>
            </View>
        </>
    )


}