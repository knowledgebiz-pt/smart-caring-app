import React, { useEffect, useState } from 'react'
import { useColorScheme, View, Image, Text, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommentService } from 'smart-caring-client/client'
import Toast from 'react-native-toast-message'
import { useTranslation } from "react-i18next"


export default function CommentInputPopup({
    postContent,
    user,
    feedIcon,
    feedStyle,
    blurOnSubmit,
    hasBorder,
    borderColor,
    placeholder,
    img,
    userId,
    newsId,
    modalVisible,
    closeModal,
    onSubmit,
    event,
    updateNews,
}) {
    // const [modalVisible, setModalVisible] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [textValue, setTextValue] = useState("")
    const {t, i18n} = useTranslation()

    useEffect(() => {

    }, [])

    const createComment = () => {
        let commentObject = {
            user_id: userId,
            news_id: newsId,
            text: textValue,
            link: ""
        }
        console.log("commentObject: ", commentObject)
        CommentService.createComment({
            link: "",
            news_id: newsId,
            text: textValue,
            user_id: userId,
        }).then(res => {
            onSubmit()
            showToast(t("homepage_comment_created"), "success")
            updateNews()
        }).catch(e => {
            console.error("e: ", e)
            showToast(t("homepage_comment_error"), "error")
        })
    }

    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    return (
        <>
            <View style={[feedStyle, styleSelected.feedPostContainer, { zIndex: 99999999 }]}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={[styleSelected.avatar, styleSelected.avatarLeftSide, { marginTop: 10 }]}
                        source={{ uri: postContent.user.picture ? postContent.user.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }}
                    />
                    <Text style={styleSelected.feedPostUserName}>{postContent.user.name} <Image style={styleSelected.feedPostRoleIcon} source={feedIcon} /> </Text>
                </View>
                <View style={styleSelected.feedPostContentView}>
                    <Text style={styleSelected.feedPostContentText}>{postContent.text}</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={{ borderTopWidth: 1.5, borderTopColor: "#ccc", flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <Image
                        style={[styleSelected.avatar, styleSelected.avatarLeftSide, { marginLeft: 0 }]}
                        source={{ uri: user.picture ? user.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }}
                    />
                    <TextInput style={{
                            flex: 1, height: 36, borderRadius: 36, paddingHorizontal: 10, backgroundColor: "#f1f1f1",
                            marginHorizontal: 10
                        }}
                        onChangeText={(val) => setTextValue(val)} 
                        placeholder={placeholder}
                        value={textValue}
                    />
                    <MaterialCommunityIcons name="send"
                        style={[{ fontSize: 24, color: "#666", marginHorizontal: 5 }, { color: "#006BFF" }]}
                        onPress={() => {createComment(), onSubmit}} />
                </View>

            </View>
        </>
    )

}
