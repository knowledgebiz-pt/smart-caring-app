import React, { useState, useEffect, useRef, memo } from "react";
import { Text, KeyboardAvoidingView, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import LottieView from 'lottie-react-native';
import FeedPostCommentList from "./FeedPostCommentList";
import { NewsService, CommentService } from "smart-caring-client/client";
import { Video, ResizeMode } from 'expo-av';
import CommentInputPopup from "./CommentInputPopup";
import Loader from "./Loader";
import Toast from 'react-native-toast-message'
import RBSheet from 'react-native-raw-bottom-sheet'
import PostInputTransparent from "./PostInputTransparent";

import { useTranslation } from "react-i18next"

/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 */

const FeedPost = (
    {
        buttonColor,
        img,
        feedRole = "",
        postContent,
        user,
        event
    }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [favoriteIcon, setFavoriteIcon] = useState({ name: "heart-o", color: "#030849" })
    const [hasLike, setLike] = useState(false)
    const [hasFavorite, setFavorite] = useState(false)
    const [previewLoaded, setPreviewLoaded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [comments, setComments] = useState([])
    const [commentAmount, setCommentAmount] = useState(0)

    const refRBSheet = useRef()
    const {t, i18n} = useTranslation()

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910" // in case of no role
    }
    let feedIcon = null

    if (feedRole.toLowerCase() === "caregiver" && postContent.user.visibility) {
        feedStyle["backgroundColor"] = "rgba(86, 178, 136, 0.1)"
        feedIcon = require("../../assets/images/Caregiver.png")
    }
    else if (feedRole.toLowerCase() === "health professional" && postContent.user.visibility) {
        feedStyle["backgroundColor"] = "rgba(28, 163, 252, 0.1)"
        feedIcon = require("../../assets/images/Healthprofessional.png")
    }
    else if (feedRole.toLowerCase() === "patient" && postContent.user.visibility) {
        feedStyle["backgroundColor"] = "rgba(3, 8, 73, 0.1)"
        feedIcon = require("../../assets/images/Patient.png")
    }

    useEffect(() => {
        setCommentAmount(postContent.total_comments)
        setImage(img)
        if (postContent.favorites && postContent.favorites.length) {
            let foundId = postContent.favorites.find((id) => { return id === user._id.$oid })
            if (foundId) {
                setFavoriteIcon({ name: "heart", color: "#CB1000" })
                setFavorite(true)
            }
        }
        if (postContent.likes && postContent.likes.length) {
            let foundId = postContent.likes.find((id) => { return id === user._id.$oid })
            if (foundId) {
                setLike(true)
            }
        }
        // retrieveComments()
    }, [])

    const showToast = (msg, type = "success") => {
        // Types: success, error, info
        Toast.show({ type: type, text1: msg, position: 'bottom' })
    }

    const likeButton = (giveLike) => {
        if (giveLike) {
            NewsService.addLikeToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
            }).catch(e => {
                console.error("e: ", e)
                showToast(t("homepage_error_like"), "error")
            })
        }
        else {
            NewsService.deleteLikeToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
            }).catch(e => {
                console.error("e: ", e)
                showToast(t("homepage_error_unlike"), "error")
            })
        }
    }

    const favoriteButton = (giveFavorite) => {
        if (giveFavorite) {
            NewsService.addFavoritesToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
            }).catch(e => {
                console.error("e: ", e)
                showToast(t("homepage_error_favorite"), "error")
            })
        }
        else {
            NewsService.deleteFavoritesToNewsArticle(postContent._id.$oid, user._id.$oid).then(res => {
            }).catch(e => {
                console.error("e: ", e)
                showToast(t("homepage_error_unfavorite"), "error")
            })
        }
    }

    const retrieveComments = () => {
        setIsLoading(true)
        CommentService.getCommentsByIdNews(postContent._id.$oid).then(res => {
            setComments(res.data)
            console.warn(1)
            setIsLoading(false)
        }).catch(e => {
            if (!e.includes("Not Found")) {
                console.error("e: ", e)
                showToast(t("homepage_comment_get_error"), "error")
            }
            setIsLoading(false)
            console.warn(2)
        })
        console.warn(3)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (<>
        <View style={[feedStyle, styleSelected.feedPostContainer]}>
            {/* <CommentInputPopup onSubmitEditing={() => {postContent.total_comments += 1; setModalVisible(false)}} newsId={postContent._id.$oid} userId={user._id.$oid} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"} modalVisible={modalVisible} closeModal={() => {setModalVisible(false)}} /> */}
            <View >
                <RBSheet
                    keyboardAvoidingViewEnabled={false}
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    animationType="fade"
                    closeDuration={50}
                    height={400}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#00000070"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        },
                        container: {
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15
                        }
                    }}
                >
                    <CommentInputPopup placeholder={t("homepage_write_comment")} feedStyle={feedStyle} postContent={postContent} user={user} feedIcon={feedIcon} newsId={postContent._id.$oid} userId={user._id.$oid} onSubmit={() => {postContent.total_comments += 1; refRBSheet.current.close(); setCommentAmount(postContent.total_comments)}} />                    
                </RBSheet>
            </View>
            <View style={{flexDirection: "row", height:40, flex: 1}}>
                <View style={{flex: .75}} >
                <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 0, justifyContent:"center", alignItems:"center"}]}
                    source={{uri: postContent?.user?.picture ? postContent?.user?.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                </View>
                <View style={{flex: 2, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}} >
                    <Text style={[styleSelected?.feedPostUserName, {marginLeft: 0}]}>{postContent?.user?.name.substring(0,25)}{postContent?.user?.name.length > 25 && "..."}</Text>
                    <Image style={[styleSelected?.feedPostRoleIcon, {height: 35}]} resizeMode="contain" source={feedIcon}/>
                    
                </View>
                <View style={{flex: 1, justifyContent:"center", alignItems:"flex-end"}} >
                    <Text style={[styleSelected.feedPostContentSeeComments, {textDecorationLine: "none"}]}>{postContent.date.substring(0,10)}</Text>
                </View>
                <View style={{flex: .6, justifyContent:"center", alignItems:"center"}} >
                <TouchableOpacity onPress={() => {
                    if (!hasFavorite) setFavoriteIcon({name: "heart", color: "#CB1000"})
                    else setFavoriteIcon({name: "heart-o", color: "#030849"})
                    favoriteButton(!hasFavorite)
                    setFavorite(!hasFavorite)
                }}>
                    <FontAwesome name={favoriteIcon.name} style={[styleSelected.feedPostHeartIcon, {color: favoriteIcon.color, marginTop:0,justifyContent:"center", alignItems:"center" }]} />
                </TouchableOpacity>
                </View>
                {/* <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 10}]}
                    source={{uri: postContent.user.picture ? postContent.user.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                <Text style={styleSelected.feedPostUserName}>{postContent.user.name.substring(0,25)}{postContent.user.name.length > 25 && "..."} <Image style={styleSelected.feedPostRoleIcon} source={feedIcon}/></Text>
                <Text style={[styleSelected.feedPostContentSeeComments, {verticalAlign: "middle", flex: 1, marginRight:45, marginTop:5, textDecorationLine: "none"}]}>{postContent.date.substring(0,10)}</Text>
                <TouchableOpacity style={styleSelected.feedPostHeartIconPosition} onPress={() => {
                    if (!hasFavorite) setFavoriteIcon({name: "heart", color: "#CB1000"})
                    else setFavoriteIcon({name: "heart-o", color: "#030849"})
                    favoriteButton(!hasFavorite)
                    setFavorite(!hasFavorite)
                }}>
                    <FontAwesome name={favoriteIcon.name} style={[styleSelected.feedPostHeartIcon, {color: favoriteIcon.color}]} />
                </TouchableOpacity> */}
            </View>
            {/* <View style={{flexDirection:"row"}}>
            <Image
                    style={[styleSelected.avatar, styleSelected.avatarLeftSide, {marginTop: 10}]}
                    source={{uri: postContent.user.picture ? postContent.user.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                /> 
                <Text style={styleSelected.feedPostUserName}>{postContent.user.name.substring(0,25)}{postContent.user.name.length > 25 && "..."} <Image style={styleSelected.feedPostRoleIcon} source={feedIcon}/></Text>
                <Text style={[styleSelected.feedPostContentSeeComments, {verticalAlign: "middle", flex: 1, marginRight:45, marginTop:5, textDecorationLine: "none"}]}>{postContent.date.substring(0,10)}</Text>
                <TouchableOpacity style={styleSelected.feedPostHeartIconPosition} onPress={() => {
                    if (!hasFavorite) setFavoriteIcon({name: "heart", color: "#CB1000"})
                    else setFavoriteIcon({name: "heart-o", color: "#030849"})
                    favoriteButton(!hasFavorite)
                    setFavorite(!hasFavorite)
                }}>
                    <FontAwesome name={favoriteIcon.name} style={[styleSelected.feedPostHeartIcon, {color: favoriteIcon.color}]} />
                </TouchableOpacity>
            </View> */}
            <View style={styleSelected.feedPostContentView}>
                <Text style={styleSelected.feedPostContentText}>{postContent.text}</Text>
                {/* { !previewLoaded && <View style= {{height:147}}> */}
                {/* <LottieView style={{ marginRight: 30 }} resizeMode="contain" autoPlay={true} source={require('../../assets/json/loading-heart.json')} /> */}

                {/* </View>} */}
                {/* <RNUrlPreview onLoad={() => setPreviewLoaded(true)} text={postContent.linkInPost} title={false} description={false} descriptionNumberOfLines={0} containerStyle={{}} imageStyle={styleSelected.feedPostContentUrlPreviewImage} descriptionStyle={{fontSize:0}}  /> */}
                {(postContent.content.type === "img" || postContent.content.type === "image") &&
                    <Image source={{ uri: postContent.content.path ? postContent.content.path : null }} onLoad={() => setPreviewLoaded(true)} style={styleSelected.feedPostContentUrlPreviewImage} />
                }
                {postContent.content.type === "video" &&
                    <Video resizeMode={ResizeMode.CONTAIN} useNativeControls source={{ uri: postContent.content.path ? postContent.content.path : null }} onLoad={() => setPreviewLoaded(true)} style={styleSelected.feedPostContentUrlPreviewImage} />
                }
                {postContent.link !== "" && // postContent.link &&
                    <Text onPress={() => { Linking.openURL(postContent.link) }} style={styleSelected.feedPostContentUrl}>{postContent.link}</Text>

                }
                <View style={styleSelected.feedPostButtonsView}>

                    {hasLike ?
                        <TouchableOpacity onPress={() => { setLike(false); likeButton(false) }} style={[styleSelected.smallButtonPost, { borderColor: buttonColor }]}>
                            <MaterialCommunityIcons name={'thumb-up'}
                                size={15}
                                color={"#56B288"} /><Text style={[styleSelected.feedPostButtonsText, { color: buttonColor }]}> {t("homepage_like")}</Text>
                        </TouchableOpacity> :

                        <TouchableOpacity onPress={() => { setLike(true); likeButton(true) }} style={[styleSelected.smallButtonPost, { borderColor: buttonColor }]}>
                            <MaterialCommunityIcons name={'thumb-up-outline'}
                                size={15}
                                color={buttonColor} /><Text style={[styleSelected.feedPostButtonsText, { color: buttonColor }]}> {t("homepage_like")}</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current.open()
                        // if (modalVisible) {
                        //     setModalVisible(false)
                        //     setTimeout(() => {
                        //         setModalVisible(true)
                        //     }, 250)
                        // }
                        // else setModalVisible(true)
                    }} style={[styleSelected.smallButtonPost, { borderColor: buttonColor, marginLeft: 5 }]}>
                        <MaterialCommunityIcons name={'comment-outline'}
                            size={15}
                            color={buttonColor} /><Text style={[styleSelected.feedPostButtonsText, { color: buttonColor }]}> {t("homepage_comment")}</Text>
                    </TouchableOpacity>
                                        
                    <FeedPostCommentList postContent={postContent} commentAmount={commentAmount} avatarPicture={""} modalVisible={true} userName={"teste"}  comment={"text"} />
                </View>
            </View>
        </View>
    </>
    )
}
export default memo(FeedPost)