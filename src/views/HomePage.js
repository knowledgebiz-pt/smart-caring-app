import React, { useEffect, useState, useCallback, useRef } from 'react'
import { SafeAreaView, StatusBar, FlatList, SectionList, Appearance, useColorScheme, ScrollView, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import HeaderLogoAndProfileImage from '../components/HeaderLogoAndProfileImage'
import { UserService, NewsService, OpenAPI } from "smart-caring-client/client"
import PostInputTransparent from '../components/PostInputTransparent'
import SelectTransparent from '../components/SelectTransparent'
import FeedPost from '../components/FeedPost'
import PostInputPopup from '../components/PostInputPopup'
// import {  } from 'smart-caring-client/client'
import SortAndFilterSelects from '../components/SortAndFilterSelects'
import Toast from 'react-native-toast-message'
import CommentInputPopup from '../components/CommentInputPopup'

export default function HomePage({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [filterSelectOpen, setFilterSelectOpen] = useState(false)
    const [sortSelectValue, setSortSelectValue] = useState({label: "Recent", value: 'recent'})
    const [filterSelectValue, setFilterSelectValue] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const mockFeedPosts = [
        {
            id:1,
            avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
            userName: "Rodrigo Sousa",
            userRole: "Caregiver",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.alz.org/",
            isFavorite: false,
            hasLike: false,
            comments: [
                {
                    id:1,
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                },
                {
                    id:2,
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                },
                {
                    id:3,
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                }
            ]
        },
        {
            id:2,
            avatarPicture: "https://t4.ftcdn.net/jpg/00/66/01/29/360_F_66012928_ztFfdS8dnLgghWKWxrDOH8FfhrzAkI2Z.jpg",
            userName: "Sara Santos",
            userRole: "Health Professional",
            text: "Lorem ipsum dolor sit amet. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.github.com/",
            isFavorite: true,
            hasLike: true,
            comments: []
        },
        {
            id:3,
            avatarPicture: "https://t4.ftcdn.net/jpg/00/66/01/29/360_F_66012928_ztFfdS8dnLgghWKWxrDOH8FfhrzAkI2Z.jpg",
            userName: "Sara Santos",
            userRole: "Patient",
            text: "Lorem ipsum dolor sasdsadsadsadsadsadsafdaqwfwqrwqrit amet. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.github.com/",
            isFavorite: true,
            hasLike: false,
            comments: []
        },
        {
            id:4,
            avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
            userName: "Rodrigo Sousa",
            userRole: "Caregiver",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.alz.org/",
            isFavorite: false,
            hasLike: false,
            comments: [
                {
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                },
                {
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                },
                {
                    avatarPicture: "https://st2.depositphotos.com/3917667/11003/i/950/depositphotos_110038202-stock-photo-the-smiling-male-office-worker.jpg",
                    userName: "Rodrigo Sousa",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
                }
            ]
        },
        {
            id:5,
            avatarPicture: "https://t4.ftcdn.net/jpg/00/66/01/29/360_F_66012928_ztFfdS8dnLgghWKWxrDOH8FfhrzAkI2Z.jpg",
            userName: "Sara Santos",
            userRole: "Health Professional",
            text: "Lorem ipsum dolor sit amet. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.github.com/",
            isFavorite: true,
            hasLike: true,
            comments: []
        },
        {
            id:6,
            avatarPicture: "https://t4.ftcdn.net/jpg/00/66/01/29/360_F_66012928_ztFfdS8dnLgghWKWxrDOH8FfhrzAkI2Z.jpg",
            userName: "Sara Santos",
            userRole: "Patient",
            text: "Lorem ipsum dolor sasdsadsadsadsadsadsafdaqwfwqrwqrit amet. Fusce accumsan luctus quam, id pharetra mauris vehicula ut. Donec non iaculis ligula, ut commodo libero. Aenean iaculis mollis efficitur.",
            linkInPost: "https://www.github.com/",
            isFavorite: true,
            hasLike: false,
            comments: []
        },
    ]

    const [feedPosts, setFeedPosts] = useState([]) /* original feed post array. Should not be altered
                                                      through filters */
    const [displayFeedPosts, setDisplayFeedPosts] = useState([]) // feed posts to display and manipulate

    const [sortItems, setSortItems] = useState([
        {label: 'Recent', value: 'recent'},
        {label: 'Old', value: 'old'}
    ])

    const [filterItems, setFilterItems] = useState([
        {label: "All", value: "All"},
        {label: 'Caregiver', value: 'Caregiver'},
        {label: 'Patient', value: 'Patient'},
        {label: 'Health Professional', value: 'Health Professional'},
        {label: 'Unlabeled', value: 'Unlabeled'}


    ])

    const sortPosts = (val) => { // affects current displayFeedPosts
        if (val.value === "recent") {
            let array = [...displayFeedPosts].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setDisplayFeedPosts(array)
        }
        else if (val.value === "old") {
            displayFeedPosts.reverse()
        }
    }

    const filterPosts = (val) => { // Will get data from original feedPosts array, but won't modify directly
        let newArray = [...feedPosts]
        if (val.value !== "All" && val.value !== "Unlabeled") {
            newArray = newArray.filter(post => {
                return ((post.user.user_type === val.value) && post.user.visibility === true)
            })
        }
        else if (val.value === "Unlabeled") {
            newArray = newArray.filter(post => {
                return post.user.visibility === false
            })
        }
        setDisplayFeedPosts(newArray)
        if (sortSelectValue.value === "recent") {
            let array = [...newArray].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setDisplayFeedPosts(array)
        }
        else if (sortSelectValue.value === "old") {
            displayFeedPosts.reverse()
        }
    }

    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    useEffect(() => {
        UserService.getUserDataByIdUser("Ruben@teste.com", "Teste").then(res => {
            setUser(res.data)
            OpenAPI.TOKEN = res.token.access_token
            // console.log(res.data._id.$oid)
            setName(res.data.name)
            NewsService.getNewsAllArticles().then(result => {
                setFeedPosts([...result.data])
                let array = [...result.data].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setDisplayFeedPosts(array)
                setIsLoading(false)
            }).catch(e => {
                console.error("e: ",e)
                setIsLoading(false)
                showToast("Error getting feed posts.", "error")
            })
        }).catch(e =>{ 
            console.error("e: ",e)
            setIsLoading(false)
        })
    }, [])
    Appearance.getColorScheme()
    Appearance.addChangeListener(({ colorScheme }) => {
        console.log('COLOR THEME WAS ALTER')
        console.log(colorScheme)
        if (Platform.OS === 'android')
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.Base_Slot_1 : colors.Base_Slot_1)
    })
    const onLayoutRootView = useCallback(async () => {
        if (isLoading) {
        }
    }, [isLoading]);
    if (isLoading) {
        return (
            <Loader />
        );
    }

    const getArticleData = () => {
        setIsLoading(true)
        NewsService.getNewsAllArticles().then(result => {
            setFeedPosts([...result.data])
            let array = [...result.data].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setDisplayFeedPosts(array)
            setIsLoading(false)
        }).catch(e => {
            console.error("e: ",e)
            setIsLoading(false)
            showToast("Error getting feed posts.", "error")
        })
    }

    const Item = ({postContent, index}) => (
        <>
            {index === 0  && 
            <>            
                <View style={{alignSelf: "center"}}>
                    <Text style={[styleSelected.textBold10DarkBlue]}>Hello, {name.split(" ")[0]}!</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <PostInputTransparent onSubmitEditing={() => {getArticleData()}} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"}/>
                </View>
                <View style={{borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop:10, width: "90%", alignSelf: "center"}}></View>
                <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} onSelectSort={(val) => {setSortSelectValue(val); setSortSelectOpen(false); sortPosts(val)}} sortValue={sortSelectValue} onSelectFilter={(val) => {setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val)}} filterValue={filterSelectValue} />
            </>
            }
            <View style={{flexDirection: "row", width: "90%", alignSelf: "center", marginTop: 20}}>
                <FeedPost postContent={postContent} user={user} feedRole={postContent.user.user_type} buttonColor={"#030849"}/>
            </View>
        </>
    )
    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <View style={{zIndex:9999, }}>
                <PostInputPopup userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"} />
                <CommentInputPopup modalVisible={modalVisible} closeModal={() => {setModalVisible(false)}}  blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"} />

            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, {paddingBottom: 115}]}>
                    <View style={{height:110}}>
                        <HeaderLogoAndProfileImage img={user.picture}/>
                    </View>
                    {displayFeedPosts.length === 0 &&
                    <>
                        <View style={{alignSelf: "center"}}>
                            <Text style={[styleSelected.textBold10DarkBlue]}>Hello, {name.split(" ")[0]}!</Text>
                        </View>
                        <View style={{marginTop: 20}}>
                            <PostInputTransparent onSubmitEditing={() => {getArticleData()}} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"}/>
                        </View>
                        <View style={{borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop:10, width: "90%", alignSelf: "center"}}></View>
                        <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} onSelectSort={(val) => {setSortSelectValue(val); setSortSelectOpen(false); sortPosts(val)}} sortValue={sortSelectValue} onSelectFilter={(val) => {setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val)}} filterValue={filterSelectValue} />
                    </>
                    }
                    
                    <FlatList
                        data={displayFeedPosts}
                        renderItem={({item, index}) => {return <Item postContent={item} index={index}/>}}
                        keyExtractor={item => item.id}
                        style={{zIndex:-5}}
                    />
                </View>
                

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}