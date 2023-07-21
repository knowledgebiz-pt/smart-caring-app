import React, { useState, useEffect, memo } from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 */

const FeedPostComment =( // IN PROGRESS
    {
        buttonColor,
        avatarPicture,
        userName,
        comment,
        feedRole="",
        isSelected,
        event
    }) => {

    const [image, setImage] = useState(null)
    const [favoriteIcon, setFavoriteIcon] = useState({name: "heart-o", color: "#030849"})
    const [hasLike, setLike] = useState(false)
    const [previewLoaded, setPreviewLoaded] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910", // in case of no role
    }
    let feedIcon = null
    
    if (feedRole.toLowerCase() === "caregiver") {
        feedStyle["backgroundColor"] = "rgba(86, 178, 136, 0.1)"
        feedIcon = require("../../assets/images/Caregiver.png")
    }
    else if (feedRole.toLowerCase() === "health professional") {
        feedStyle["backgroundColor"] = "rgba(28, 163, 252, 0.1)"
        feedIcon = require("../../assets/images/Healthprofessional.png")
    }
    else if (feedRole.toLowerCase() === "patient") {
        feedStyle["backgroundColor"] = "rgba(3, 8, 73, 0.1)"
        feedIcon = require("../../assets/images/Patient.png")
    }

    useEffect(() => {
        // setImage(img)
        // if (postContent.isFavorite) {
        //     setFavoriteIcon({name: "heart", color: "#CB1000"})        
        // }
        // if (postContent.hasLike) {
        //     setLike(true)
        // }
    }, [])

    return (<>
        <View style={[feedStyle, styleSelected.feedPostContainer, { zIndex:99999999}, isSelected && {backgroundColor:"#1CA3FC", borderRadius:0}]}>
            <View style={{flexDirection: "row"}}>
                <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 10}]}
                    source={{uri: avatarPicture ? avatarPicture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                <Text style={styleSelected.feedPostUserName}>{userName} </Text>
            </View>
            <View style={styleSelected.feedPostContentView}>
                <Text style={styleSelected.feedPostContentText}>{comment}</Text>                                             
            </View>
        </View>
        </>
    )
}   
export default memo(FeedPostComment)