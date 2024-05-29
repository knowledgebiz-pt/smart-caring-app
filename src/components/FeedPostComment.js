import React, { useState, useEffect, memo } from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { CommentService } from "@knowledgebiz/smart-caring-client/client";

/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 * @param commentInfo: any
 */

const FeedPostComment = ( // IN PROGRESS
    {
        buttonColor,
        avatarPicture,
        userName,
        comment,
        feedRole = "",
        isSelected,
        event,
        commentInfo,
        updateNews,
    }) => {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910", // in case of no role
    }

    if (feedRole.toLowerCase() === "caregiver") {
        feedStyle["backgroundColor"] = "rgba(86, 178, 136, 0.1)"
    }
    else if (feedRole.toLowerCase() === "health professional") {
        feedStyle["backgroundColor"] = "rgba(28, 163, 252, 0.1)"
    }
    else if (feedRole.toLowerCase() === "patient") {
        feedStyle["backgroundColor"] = "rgba(3, 8, 73, 0.1)"
    }

    useEffect(() => {
        console.log("comment", commentInfo)
    }, [])

    return (<>
        <View style={[feedStyle, styleSelected.feedPostContainer, { zIndex: 99999999 }, isSelected && { backgroundColor: "#1CA3FC", borderRadius: 0 }]}>
            <View style={{ flexDirection: "row" }}>
                <View style={{flex: 1}}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <Image
                            style={[styleSelected.avatar, styleSelected.avatarLeftSide, { marginTop: 10 }]}
                            source={{ uri: avatarPicture ? avatarPicture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }}
                        />
                        <Text style={styleSelected.feedPostUserName}>{userName} </Text>
                    </View>
                    <View style={[styleSelected.feedPostContentView, { marginLeft: 65 }]}>
                        <Text style={styleSelected.feedPostContentText}>{comment}</Text>
                    </View>
                </View>
                <View style={{ flex: .2, justifyContent: "center", alignItems: "center" }}>
                    <MaterialCommunityIcons name="trash-can" size={25} onPress={() => {
                        console.log(commentInfo)
                        console.log("delete comment")
                        console.log(commentInfo._id.$oid)
                        CommentService.deleteCommentByIdComment(commentInfo._id.$oid).then(res => {
                            console.log(res)
                            updateNews()
                        }).catch(e => {
                            console.error(e)
                        })
                    }} />
                </View>
            </View>
        </View>
    </>
    )
}
export default memo(FeedPostComment)