import React, { useState, useEffect, useRef } from "react";
import { Text, ScrollView, Modal, Pressable, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { FlatList } from "react-native-gesture-handler";
import FeedPostComment from "./FeedPostComment";
import { CommentService } from "@knowledgebiz/smart-caring-client/client";
import Loader from "./Loader";
import Toast from 'react-native-toast-message'
import { useTranslation } from "react-i18next"
import RBSheet from 'react-native-raw-bottom-sheet'

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
        event,
        updateNews,
    }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)
    const { t, i18n } = useTranslation()

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910" // in case of no role
    }
    const refRBSheet = useRef()

    useEffect(() => {
    }, [])

    const showToast = (msg, type = "success") => {
        // Types: success, error, info
        Toast.show({ type: type, text1: msg, position: 'bottom' })
    }

    const retrieveComments = () => {
        refRBSheet.current.open()
        setSelectedComment(null)
        setModalVisible(true)
        setIsLoading(true)
        CommentService.getCommentsByIdNews(postContent._id.$oid).then(res => {
            setComments(res.data)
            setIsLoading(false)
        }).catch(e => {
            if (!e.includes("Not Found")) {
                console.error("e: ", e)
                showToast(t("homepage_comment_get_error"), "error")
            }
            setIsLoading(false)
        })
        setIsLoading(false)
    }

    const selectComment = (item, index) => {
        setSelectedComment({ data: item, index })
        console.log(item)
    }

    const Item = ({ comment, index }) => (<>
        <View style={{ marginBottom: 5 }}>
            <Pressable onLongPress={() => selectComment(comment, index)} onPress={() => setSelectedComment(null)}>
                <FeedPostComment
                    isSelected={selectedComment && selectedComment.index === index}
                    comment={comment.text}
                    avatarPicture={comment.user_info.user_picture}
                    feedRole={comment.user_info.user_type}
                    userName={comment.user_info.user_name}
                    commentInfo={comment}
                    updateNews={updateNews}
                />
            </Pressable>
        </View>
    </>)

    return (<>
        <TouchableOpacity style={styleSelected.feedPostContentSeeCommentsTouchableOpacity} onPress={() => {
            if (postContent.total_comments && postContent.total_comments > 0) {
                retrieveComments();
            }
        }}>
            <Text style={styleSelected.feedPostContentSeeComments} >{postContent.total_comments && postContent.total_comments > 0 ? t("homepage_comment_see") + postContent.total_comments + (postContent.total_comments === 1 ? " " + t("homepage_comment_lowercase") : " " + t("homepage_comments")) : t("homepage_no_comments")}</Text>
        </TouchableOpacity>
        <RBSheet 
        transparent={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={false}
        ref={refRBSheet} height={500}>
                <ScrollView>
                    <View style={isLoading && { borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: 20 }} onStartShouldSetResponder={() => true}>
                        {!isLoading && <FlatList
                            data={comments}
                            renderItem={({ item, index }) => { return <Item comment={item} index={index} /> }}
                            keyExtractor={item => item.id}
                        />}
                        {isLoading && <Loader />}
                    </View>
                </ScrollView>
        </RBSheet>
    </>
    )
}