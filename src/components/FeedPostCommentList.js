import React, { useState, useEffect } from "react";
import { Text, ScrollView, Modal, Pressable, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons"
import RNUrlPreview from 'react-native-url-preview';
import LottieView from 'lottie-react-native';
import { FlatList } from "react-native-gesture-handler";
import FeedPostComment from "./FeedPostComment";
import { CommentService } from "smart-caring-client/client";
import Loader from "./Loader";

/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 */

export default function FeedPostCommentList(
    {
        buttonColor,
        img,
        feedRole,
        comment_amount,
        postContent,
        event
    }) {

    const [image, setImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910" // in case of no role
    }

    useEffect(() => {
        setImage(img)
    }, [])

    const retrieveComments = () => {
        setSelectedComment(null)
        setModalVisible(true)
        setIsLoading(true)
        CommentService.getCommentsByIdNews(postContent._id.$oid).then(res => {
            setComments(res.data)
            setIsLoading(false)
        }).catch(e => {
            if (!e.includes("Not Found")) {
                console.error("e: ", e)
                showToast("An error has occurred when trying to fetch the comments from a post.", "error")
            }
            setIsLoading(false)
        })
        // setIsLoading(false)
    }

    const selectComment = (item, index) => {
        setSelectedComment({data: item, index})
        console.log(item)
    }

    const Item = ({comment, index}) => (<>
    <View style={{marginBottom:5}}>
        <Pressable onLongPress={() => selectComment(comment,index)} onPress={() =>setSelectedComment(null)}>
            <FeedPostComment isSelected={selectedComment && selectedComment.index === index} comment={comment.text} avatarPicture={comment.user_info.user_picture} feedRole={comment.user_info.user_type} userName={comment.user_info.user_name}/>
        </Pressable>
    </View>
    </>)

    // if (isLoading) {
    //     return (
    //         <Loader />
    //     );
    // }

    return (<>        
            <TouchableOpacity style={styleSelected.feedPostContentSeeCommentsTouchableOpacity} onPress={() => {
                if (postContent.total_comments && postContent.total_comments > 0) retrieveComments(); 
                }}>
                    <Text style={styleSelected.feedPostContentSeeComments} >{ postContent.total_comments && postContent.total_comments > 0 ?  "See "+ postContent.total_comments + (postContent.total_comments === 1 ? " comment" : " comments") : "No comments"}</Text>
                </TouchableOpacity>
                <Modal animationType='slide' transparent={true} visible={modalVisible}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => event.target === event.currentTarget && setModalVisible(false)}>
                        <ScrollView style={styleSelected.feedCommentModalView}>
                            <View style={isLoading && {borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: 20}} onStartShouldSetResponder={() => true}>
                                {!isLoading && <FlatList
                                    data={comments}
                                    renderItem={({item, index}) => {return <Item comment={item} index={index}/>}}
                                    keyExtractor={item => item.id}
                                />}
                                {isLoading &&  <Loader />}
                            </View>
                        </ScrollView>
                    </Pressable>
                </Modal>
        </>
    )
}