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

/***
 * @param buttonColor: string - Determine the color of the component's buttons and their borders.
 * @param value: string - Value of the TextInput
 * @param img: string - URI of the user's profile image
 * @param feedRole: string - Defines appearance of post. Specific to SmartCaring. Accepted values: caregiver, health professional, patient
 * @param postContent: object - All content related to the post, i.e. profile picture, text, links, whether post has been favorited or liked
 * @param event: any
 */

export default function FeedPostCommentList( // IN PROGRESS
    {
        buttonColor,
        img,
        feedRole,
        comments,
        postContent,
        event
    }) {

    const [image, setImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    let feedStyle = {
        backgroundColor: "#5B5E8910" // in case of no role
    }

    useEffect(() => {
        setImage(img)
    }, [])

    const Item = ({comment, index}) => (<>
    <View style={{marginBottom:5}}>
        <FeedPostComment comment={comment.text} avatarPicture={comment.avatarPicture} userName={comment.userName}/>
    </View>
    </>)

    return (<>        
            <TouchableOpacity style={styleSelected.feedPostContentSeeCommentsTouchableOpacity} onPress={() => {
                if (postContent.comments && postContent.comments.length > 0) setModalVisible(true); 
                }}>
                    <Text style={styleSelected.feedPostContentSeeComments} >{ postContent.comments && postContent.comments.length ?  "See "+ postContent.comments.length + (postContent.comments.length === 1 ? " comment" : " comments") : "No comments"}</Text>
                </TouchableOpacity>
                <Modal animationType='slide' transparent={true} visible={modalVisible}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => event.target === event.currentTarget && setModalVisible(false)}>
                        <ScrollView style={styleSelected.feedCommentModalView}>
                            <View onStartShouldSetResponder={() => true}>
                                <FlatList
                                    data={comments}
                                    renderItem={({item, index}) => {console.log(item);return <Item comment={item} index={index}/>}}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </ScrollView>
                    </Pressable>
                </Modal>
        </>
    )
}