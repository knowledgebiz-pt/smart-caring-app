import React, { useState, useEffect } from "react";
import { Text, Modal, Pressable, Image, View, Linking, TouchableOpacity, TextInput, useColorScheme, Touchable } from "react-native";
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
    // let feedIcon = null
    
    // if (feedRole.toLowerCase() === "caregiver") {
    //     feedStyle["backgroundColor"] = "rgba(86, 178, 136, 0.1)"
    //     feedIcon = require("../../assets/images/Caregiver.png")
    // }
    // else if (feedRole.toLowerCase() === "health professional") {
    //     feedStyle["backgroundColor"] = "rgba(28, 163, 252, 0.1)"
    //     feedIcon = require("../../assets/images/Healthprofessional.png")
    // }
    // else if (feedRole.toLowerCase() === "patient") {
    //     feedStyle["backgroundColor"] = "rgba(3, 8, 73, 0.1)"
    //     feedIcon = require("../../assets/images/Patient.png")
    // }

    useEffect(() => {
        setImage(img)
        console.info('absd')
        // if (postContent.isFavorite) {
        //     setFavoriteIcon({name: "heart", color: "#CB1000"})        
        // }
        // if (postContent.hasLike) {
        //     setLike(true)
        // }
    }, [])

    const Item = ({comment, index}) => (<>
        <FeedPostComment comment={comment.text} img={comment.avatarPicture} userName={comment.userName}/>
    </>)

    return (<>
    <View style={styleSelected.modalCenteredView}>
                <Modal animationType='fade' transparent={true} visible={modalVisible}>
                    <Pressable style={styleSelected.modalCenteredView} onPress={(event) => event.target === event.currentTarget && setModalVisible(false)}>
                        <View style={styleSelected.modalView}>
                        <FlatList
                            data={comments}
                            renderItem={({item, index}) => {return <Item postContent={item} index={index}/>}}
                            keyExtractor={item => item.id}
                        />
                        </View>
                    </Pressable>
                </Modal>
            </View>
        
        </>
    )
}