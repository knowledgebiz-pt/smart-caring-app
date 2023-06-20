import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity, Touchable, TextInput, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

/***
 * @param placeholder: string - Text that will appear as placeholder
 * @param inputMode: string - Determines type of keyboard to open. Defaults to "text". Valid values: 'decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url'
 * @param secureTextEntry: boolean - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Defaults to false.
 * @param onSubmitEditing: function - Callback that is called when the text input's submit button is pressed.
 * @param returnKeyType: string - Determines how the return key looks. Valid values: 'default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call'. Defaults to 'default'
 * @param inputRef: React.MutableRefObject<undefined> - Allows getting a ref to the component instance. Defaults to null
 * @param blurOnSubmit: boolean - If true, closes the keyboard on pressing the submit button. Defaults to true
 * @param onChangeText: function - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
 * @param hasBorder: boolean - Determine whether the component has a border around it. Defaults to false
 * @param borderColor: string - Determine the color of the component's border, in case it has one.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param event: any
 */

export default function PostInputTransparent(
    {
        placeholder,
        inputMode = "text",
        secureTextEntry = false,
        onSubmitEditing,
        returnKeyType = "default",
        inputRef = null,
        blurOnSubmit = true,
        hasBorder = false,
        borderColor,
        onChangeText,
        value,
        img,
        event
    }) {

    const [textValue, setTextValue] = useState("")
    const [image, setImage] = useState(null)
    const [postImage, setPostImage] = useState(null)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: .2,
        allowsMultipleSelection: false
        });

        console.log(result);

        if (!result.canceled) {
        setPostImage(result.assets[0].uri);
        }
    };

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let inputStyles = { backgroundColor: colors.BaseSlot1, flexDirection: "row", paddingLeft: 20, fontSize: 10 }
    const sizeStyleSelected = styleSelected.postInputSize
    if (hasBorder) {
        inputStyles['borderWidth'] = 1
        inputStyles['borderColor'] = borderColor
        inputStyles['borderRadius'] = 10
    }

    useEffect(() => {
        setImage(img)
    }, [])

    return (<>
        <View style={{flexDirection: "row"}}>
            <Image
                style={[styleSelected.avatar, styleSelected.avatarLeftSide]}
                source={{uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
            />
            <TextInput
                style={[sizeStyleSelected, inputStyles, {marginTop:0}]}
                fontStyle={textValue.length == 0 ? 'italic' : "normal"}
                placeholder={placeholder}
                placeholderTextColor="rgba(101, 101, 101, 0.5)"
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                ref={inputRef}
                blurOnSubmit={blurOnSubmit}
                onChangeText={(val) => {setTextValue(val)}}
                value={textValue}
                multiline={true}
                numberOfLines={6}
                scrollEnabled={true}
            />
            <View style={{flexDirection:"column"}}>
                <TouchableOpacity onPress={pickImage} style={[styleSelected.smallButtonPost, {borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    <FontAwesome  name={'picture-o'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styleSelected.smallButtonPost, {marginTop: 5, borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    <MaterialCommunityIcons  name={'movie-open-play'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styleSelected.smallButtonPost, {marginTop: 5, borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    <FontAwesome  name={'file-text-o'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                
            </View>
        </View>
        <View style={{width: "10%", marginLeft: 264, marginTop:-35}}>
            <TouchableOpacity style={{borderWidth: 0, borderRadius: 10,borderTopLeftRadius:0, borderTopRightRadius:0, borderColor:borderColor, flexDirection:"row", height: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, marginTop: 5, }}>                    
                <FontAwesome name={'send-o'}
                size={17}
                color={colors.BaseSlot2}/>
            </TouchableOpacity>
        </View>
        </>
    )
}