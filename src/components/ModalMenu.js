import React from 'react'
import { useColorScheme, View, TouchableOpacity, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

import { FontAwesome } from "@expo/vector-icons"

import RBSheet from 'react-native-raw-bottom-sheet'

export default function ModalMenu({ref}) {

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

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
                        
                    </View>
                </RBSheet>
            </View>
        </>
    )


}