import React, { useState, useEffect } from "react";
import { Text, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import RNUrlPreview from 'react-native-url-preview';
/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 */

export default function FeedPost(
    {
        buttonColor,
        img,
        feedRole,
        postContent,
        event
    }) {

    const [image, setImage] = useState(null)
    const [favoriteIcon, setFavoriteIcon] = useState({name: "heart-o", color: "#030849"})
    const [hasLike, setLike] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910" // in case of no role
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
        setImage(img)
        if (postContent.isFavorite) {
            setFavoriteIcon({name: "heart", color: "#CB1000"})        
        }
        if (postContent.hasLike) {
            setLike(true)
        }
    }, [])

    return (<>
        <View style={[feedStyle, styleSelected.feedPostContainer]}>
            <View style={{flexDirection: "row"}}>
                <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 10}]}
                    source={{uri: postContent.avatarPicture ? postContent.avatarPicture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                <Text style={styleSelected.feedPostUserName}>{postContent.userName} <Image style={styleSelected.feedPostRoleIcon} source={feedIcon}/></Text>
                <TouchableOpacity style={styleSelected.feedPostHeartIconPosition} onPress={() => {
                    if (favoriteIcon.name === "heart-o") setFavoriteIcon({name: "heart", color: "#CB1000"})
                    else setFavoriteIcon({name: "heart-o", color: "#030849"})
                }}>
                    <FontAwesome name={favoriteIcon.name} style={[styleSelected.feedPostHeartIcon, {color: favoriteIcon.color}]} />
                </TouchableOpacity>
            </View>
            <View style={styleSelected.feedPostContentView}>
                <Text style={styleSelected.feedPostContentText}>{postContent.text}</Text>
                
                <RNUrlPreview text={postContent.linkInPost} title={false} description={false} descriptionNumberOfLines={0} containerStyle={{}} imageStyle={styleSelected.feedPostContentUrlPreviewImage} descriptionStyle={{fontSize:0}}  />
                <Text onPress={() => Linking.openURL(postContent.linkInPost)} style={styleSelected.feedPostContentUrl}>{postContent.linkInPost}</Text>
                <View style={styleSelected.feedPostButtonsView}>

                    { hasLike ?
                        <TouchableOpacity onPress={() => setLike(false)} style={[styleSelected.smallButtonPost, {borderColor: buttonColor}]}>
                            <MaterialCommunityIcons  name={'thumb-up'}
                                size={15}
                                color={"#56B288"}/><Text style={[styleSelected.feedPostButtonsText, {color: buttonColor}]}> Like</Text>
                        </TouchableOpacity> :
                        
                        <TouchableOpacity onPress={() => setLike(true)} style={[styleSelected.smallButtonPost, {borderColor: buttonColor}]}>
                            <MaterialCommunityIcons  name={'thumb-up-outline'}
                                size={15}
                                color={buttonColor}/><Text style={[styleSelected.feedPostButtonsText, {color: buttonColor}]}> Like</Text>
                        </TouchableOpacity>                    
                    }
                    <TouchableOpacity style={[styleSelected.smallButtonPost, {borderColor: buttonColor, marginLeft:5}]}>
                        <MaterialCommunityIcons name={'comment-outline'}
                        size={15}
                        color={buttonColor}/><Text style={[styleSelected.feedPostButtonsText, {color: buttonColor}]}> Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleSelected.feedPostContentSeeCommentsTouchableOpacity}>
                        <Text style={styleSelected.feedPostContentSeeComments} >{ postContent.comments.length ?  "See "+ postContent.comments.length + (postContent.comments.length === 1 ? " comment" : " comments") : "No comments"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}