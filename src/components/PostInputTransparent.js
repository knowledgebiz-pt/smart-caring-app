import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity, Touchable, TextInput, useColorScheme, Alert } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { CommentService, NewsService } from "smart-caring-client/client";
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-toast-message'
import DialogInput from 'react-native-dialog-input';

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
        userId,
        newsId,
        showButtons=true,
        event
    }) {

    const [textValue, setTextValue] = useState("")
    const [image, setImage] = useState(null)
    const [postImage, setPostImage] = useState(null)
    const [urlInputVisible, setUrlInputVisible] = useState(false)
    const [linkText, setLinkText] = useState("")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: .2,
            allowsMultipleSelection: false,
            selectionLimit: 1,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
            videoMaxDuration: 30,
            base64: true
        });
        let base64 = result.assets[0].base64
        if (result.assets[0].type === "video") {
            base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding:"base64"})
        }

        console.log(result);

        if (!result.canceled) {
            setPostImage({type: result.assets[0].type, file: base64});
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "&ast;/*"
        })
        console.log(result)
    }

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

    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    const createNews = () => {
        // alert(textValue)
        console.log(textValue)
        console.log(userId)
        if (!newsId) { // Create new feed post
            let newsObject = {
                text: textValue,
                user_id: userId,
                link: linkText,
                content: {type:"", path: ""}
            }
            if (postImage) {
                newsObject["content"] = {
                    type: postImage.type,
                    path: postImage.file
                }
            }
            NewsService.createNews(newsObject).then(res => {
                console.warn(res)
                onSubmitEditing()
                showToast("You have created a new post!", "success")
            }).catch(e => {
                console.error("e: ", e)
                showToast("Error creating post.", "error")
            })
        }
        else { // Create comment on feed post
            let commentObject = {
                user_id: userId,
                news_id: newsId,
                text: textValue,
                link: ""
            }
            CommentService.createComment(commentObject).then(res => {
                console.warn(res)
                onSubmitEditing()
                showToast("Comment has been created.", "success")
            }).catch(e => {
                console.error("e: ", e)
                showToast("Error commenting on post.", "error")
            })
        }
    }

    const checkLinkValidity = (url) => {
        setLinkText(url)
        setUrlInputVisible(false)
        if (url === "") {
            showToast("No URL has been set.", "info")
        }
        else if (!url.includes("http://") && !url.includes("https://")) {            
            showToast("URL missing \"http://\" or \"https://\"", "info")
        }
        else {
            showToast("URL has been set!", "success")
        }
    }

    return (<>
            <DialogInput isDialogVisible={urlInputVisible}
                title={"URL Link"}
                message={"Please insert the whole url to the webpage you wish to link to in your post, including either \"https://\" or \"http://\" :"}
                hintInput ={"https://www.smartcaring.pt"}
                submitInput={ (inputText) => {checkLinkValidity(inputText)} }
                closeDialog={ () => {setUrlInputVisible(false)}}>
            </DialogInput>
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
            {showButtons && <View style={{flexDirection:"column"}}>
                <TouchableOpacity onPress={pickImage} style={[styleSelected.smallButtonPost, {borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    <FontAwesome  name={'picture-o'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickDocument} style={[styleSelected.smallButtonPost, {marginTop: 5, borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    {/* <MaterialCommunityIcons  name={'movie-open-play'}
                    size={15}
                    color={borderColor}/> */}
                    <FontAwesome  name={'file-text-o'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => {setUrlInputVisible(true)}} style={[styleSelected.smallButtonPost, {marginTop: 5, borderColor: borderColor}]}>
                    <MaterialCommunityIcons style={{paddingRight:2}} name={'plus'}
                    size={15}
                    color={borderColor}/>
                    <MaterialCommunityIcons  name={'link-variant'}
                    size={15}
                    color={borderColor}/>
                </TouchableOpacity>
                
            </View>}
        </View>
        <View style={{width: "10%", marginLeft: 264, marginTop:-35}}>
            <TouchableOpacity onPress={() => {createNews(), onSubmitEditing}} style={{borderWidth: 0, borderRadius: 10,borderTopLeftRadius:0, borderTopRightRadius:0, borderColor:borderColor, flexDirection:"row", height: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, marginTop: 5, }}>                    
                <FontAwesome name={'send-o'}
                size={17}
                color={colors.BaseSlot2}/>
            </TouchableOpacity>
        </View>
        </>
    )
}