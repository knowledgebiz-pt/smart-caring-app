import React, { useState, useEffect } from "react";
import { Text, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import RNUrlPreview from 'react-native-url-preview';
import LottieView from 'lottie-react-native';
import FeedPostCommentList from "./FeedPostCommentList";
import FeedPostComment from "./FeedPostComment";
import { LikesService, NewsService } from "smart-caring-client/client";

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
        feedRole="",
        postContent,
        user,
        event
    }) {

    const [image, setImage] = useState(null)
    const [favoriteIcon, setFavoriteIcon] = useState({name: "heart-o", color: "#030849"})
    const [hasLike, setLike] = useState(false)
    const [hasFavorite, setFavorite] = useState(false)
    const [previewLoaded, setPreviewLoaded] = useState(false)

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
        if (postContent.favorites && postContent.favorites.length) {
            let foundId = postContent.favorites.find((id) => {return id === user._id.$oid})
            if (foundId) {
                setFavoriteIcon({name: "heart", color: "#CB1000"})
                setFavorite(true)
            }
        }
        if (postContent.likes && postContent.likes.length) {
            let foundId = postContent.likes.find((id) => {return id === user._id.$oid})
            if (foundId) {
                setLike(true)
            }
        }
    }, [])

    const likeButton = (giveLike) => {
        if (giveLike) {
            console.log(giveLike)
            console.log(user._id.$oid)
            console.log(postContent._id.$oid)
            NewsService.addLikeToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
                console.log(res)
            }).catch(e => {
                console.error("e: ", e)
            })
        }
        else {
            NewsService.deleteLikeToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
                console.log(res)
            }).catch(e => {
                console.error("e: ", e)
            })
        }
    }

    const favoriteButton = (giveFavorite) => {
        if (giveFavorite) {
            NewsService.addFavoritesToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
                console.log(res)
            }).catch(e => {
                console.error("e: ", e)
            })
        }
        else {
            NewsService.deleteFavoritesToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
                console.log(res)
            }).catch(e => {
                console.error("e: ", e)
            })
        }
    }

    return (<>
        <View style={[feedStyle, styleSelected.feedPostContainer]}>
            <View style={{flexDirection: "row"}}>
                <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 10}]}
                    source={{uri: postContent.user.picture ? postContent.user.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                <Text style={styleSelected.feedPostUserName}>{postContent.user.name} <Image style={styleSelected.feedPostRoleIcon} source={feedIcon}/></Text>
                <TouchableOpacity style={styleSelected.feedPostHeartIconPosition} onPress={() => {
                    if (!hasFavorite) setFavoriteIcon({name: "heart", color: "#CB1000"})
                    else setFavoriteIcon({name: "heart-o", color: "#030849"})
                    favoriteButton(!hasFavorite)
                    setFavorite(!hasFavorite)
                }}>
                    <FontAwesome name={favoriteIcon.name} style={[styleSelected.feedPostHeartIcon, {color: favoriteIcon.color}]} />
                </TouchableOpacity>
            </View>
            <View style={styleSelected.feedPostContentView}>
                <Text style={styleSelected.feedPostContentText}>{postContent.text}</Text>
                {/* { !previewLoaded && <View style= {{height:147}}> */}
                    {/* <LottieView style={{ marginRight: 30 }} resizeMode="contain" autoPlay={true} source={require('../../assets/json/loading-heart.json')} /> */}
                    
                    {/* </View>} */}
                {/* <RNUrlPreview onLoad={() => setPreviewLoaded(true)} text={postContent.linkInPost} title={false} description={false} descriptionNumberOfLines={0} containerStyle={{}} imageStyle={styleSelected.feedPostContentUrlPreviewImage} descriptionStyle={{fontSize:0}}  /> */}
                <Image source={{uri: postContent.content.path ? postContent.content.path : null}} onLoad={() => setPreviewLoaded(true)} style={styleSelected.feedPostContentUrlPreviewImage} />

                {JSON.stringify(postContent.link) !== "{}" && // postContent.link &&
                    <Text onPress={() => Linking.openURL(postContent.link)} style={styleSelected.feedPostContentUrl}>{postContent.link}</Text>
                
                }
                <View style={styleSelected.feedPostButtonsView}>

                    { hasLike ?
                        <TouchableOpacity onPress={() => {setLike(false); likeButton(false)}} style={[styleSelected.smallButtonPost, {borderColor: buttonColor}]}>
                            <MaterialCommunityIcons  name={'thumb-up'}
                                size={15}
                                color={"#56B288"}/><Text style={[styleSelected.feedPostButtonsText, {color: buttonColor}]}> Like</Text>
                        </TouchableOpacity> :
                        
                        <TouchableOpacity onPress={() => {setLike(true); likeButton(true)}} style={[styleSelected.smallButtonPost, {borderColor: buttonColor}]}>
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
                                        
                    <FeedPostCommentList postContent={postContent} comments={postContent.comments} avatarPicture={""} modalVisible={true} userName={"tedte"}  comment={"text"} />
                </View>
            </View>
        </View>
        </>
    )
}