import React, { useEffect, useState, useCallback, useRef } from 'react'
import { SafeAreaView, StatusBar, FlatList, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import HeaderLogoAndProfileImage from '../components/HeaderLogoAndProfileImage'
import { UserService, NewsService, OpenAPI } from "smart-caring-client/client"
import PostInputTransparent from '../components/PostInputTransparent'
import FeedPost from '../components/FeedPost'
import PostInputPopup from '../components/PostInputPopup'
import SortAndFilterSelects from '../components/SortAndFilterSelects'
import Toast from 'react-native-toast-message'
import CustomLoader from '../components/CustomLoader'
import ModalMenu from '../components/ModalMenu'
import { FlashList } from "@shopify/flash-list"

import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from 'react-redux'
import { insertUser } from '../features/user/user'

export default function HomePage({ route, navigation }) {
    const {t, i18n} = useTranslation()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSort, setIsLoadingSort] = useState(false)
    // const [user, setUser] = useState(null)
    // const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [filterSelectOpen, setFilterSelectOpen] = useState(false)
    const [sortSelectValue, setSortSelectValue] = useState({ label: t("recent"), value: 'recent' })
    const [filterSelectValue, setFilterSelectValue] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    const user = useSelector((state) => state.user)


    const refModalMenu = useRef()
    const refScroll = useRef()

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [feedPosts, setFeedPosts] = useState([]) /* original feed post array. Should not be altered
                                                      through filters */
    const [displayFeedPosts, setDisplayFeedPosts] = useState([]) // feed posts to display and manipulate

    const dispatch = useDispatch()

    const [sortItems, setSortItems] = useState([
        { label: t("recent"), value: 'recent' },
        { label: t("old"), value: 'old' }
    ])

    const [filterItems, setFilterItems] = useState([
        { label: t("filter_all"), value: "All" },
        { label: t("filter_favorites"), value: "Favorites" },
        { label: t("filter_liked"), value: "Liked" },
        { label: t("caregiver"), value: 'Caregiver' },
        { label: t("patient"), value: 'Patient' },
        { label: t("healthPro"), value: 'Health Professional' },
        { label: t("filter_unlabeled"), value: 'Unlabeled' },
    ])

    const sortPosts = (val) => { // affects current displayFeedPosts
        if (sortSelectValue.value !== val.value) {
            setIsLoadingSort(true)
            setSortSelectValue(val)
            displayFeedPosts.reverse()
            setTimeout(() => {
                setIsLoadingSort(false)
            }, 2000)
        }
        // if (val.value === "recent") {
        //     let array = [...displayFeedPosts].sort((a, b) => {
        //         return new Date(b.date) - new Date(a.date)
        //     })
        //     setDisplayFeedPosts(array)
        //     setIsLoadingSort(false)
        // }
        // else if (val.value === "old") {
        //     displayFeedPosts.reverse()
        //     setTimeout(() => {
        //         setIsLoadingSort(false)

        //     }, 2000)
        // }
    }

    const filterPosts = (val) => { // Will get data from original feedPosts array, but won't modify directly
        console.log(val.value === "Favorites")
        setIsLoadingSort(true)
        let newArray = [...feedPosts]
        if (val.value !== "All" && val.value !== "Unlabeled" && val.value !== "Favorites" && val.value !== "Liked") {
            newArray = newArray.filter(post => {
                return ((post.user.user_type === val.value) && post.user.visibility === true)
            })
        }
        else if (val.value === "Unlabeled") {
            newArray = newArray.filter(post => {
                return post.user.visibility === false
            })
        }
        else if (val.value === "Favorites") {
            newArray = newArray.filter(post => {
                return post.favorites.includes(user._id.$oid)
            })
        }
        else if (val.value === "Liked") {
            newArray = newArray.filter(post => {
                return post.likes.includes(user._id.$oid)
            })
        }
        setDisplayFeedPosts(newArray)
        if (sortSelectValue.value === "recent") {
            let array = [...newArray].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setDisplayFeedPosts(array)
            setIsLoadingSort(false)
        }
        else if (sortSelectValue.value === "old") {
            displayFeedPosts.reverse()
            setIsLoadingSort(false)
        }
    }

    const showToast = (msg, type = "success") => {
        // Types: success, error, info
        Toast.show({ type: type, text1: msg, position: 'bottom' })
    }



    useEffect(() => {
        console.log(route.params.goUp)
        UserService.getUserDataByIdUser("ruben@teste.com", "Teste").then(res => {
            // setUser(res.data)
            OpenAPI.TOKEN = res.token.access_token
            dispatch(insertUser(res.data))
            // console.log(res.data._id.$oid)
            // setName(res.data.name)
            NewsService.getNewsAllArticles().then(result => {
                setFeedPosts([...result.data])
                let array = [...result.data].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setDisplayFeedPosts(array)
                setIsLoading(false)
            }).catch(e => {
                console.error("e: ", e)
                setIsLoading(false)
                showToast(t("homepage_toast_error_get_posts"), "error")
            })
        }).catch(e => {
            console.error("e: ", e)
            setIsLoading(false)
            showToast(t("homepage_toast_error_login"), "error")
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
            console.error("e: ", e)
            setIsLoading(false)
            showToast(t("homepage_toast_error_get_posts"), "error")
        })
    }

    const Header = ({ }) => (
        <>
            {displayFeedPosts.length > 0 &&
                <>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={[styleSelected.textBold10DarkBlue]}>{t("homepage_hello")}, {user.name.split(" ")[0]}!</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <PostInputTransparent onSubmitEditing={() => { getArticleData() }} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("homepage_post_placeholder")} />
                    </View>
                    <View style={{ borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop: 10, width: "90%", alignSelf: "center" }}></View>
                    <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} onSelectSort={(val) => { setSortSelectOpen(false); sortPosts(val) }} sortValue={sortSelectValue} onSelectFilter={(val) => { setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val) }} filterValue={filterSelectValue} />
                    <View style={{ maxHeight: "100%" }} />
                </>}
        </>
    )
    const Item = ({ postContent, index }) => (
        <View key={index} style={{ flexDirection: "row", width: "90%", alignSelf: "center", marginTop: 20, }}>
            <FeedPost onHandleLikeFavorite={(data) => handleLikeFavorite(data)} postContent={postContent} user={user} feedRole={postContent?.user?.user_type} buttonColor={"#030849"} />
        </View>
    )

    const handleLikeFavorite = ([id, shouldAdd, arrayName]) => {
        console.log("handleLike ID:",id)
        console.log("Add or retract:", shouldAdd ? "Add" : "Retract")
        console.log(displayFeedPosts.findIndex((post) => post._id.$oid === id))
        let index = displayFeedPosts.findIndex((post) => post._id.$oid === id)
        if (shouldAdd) {
            if (!displayFeedPosts[index][arrayName].includes(user._id.$oid)) {
                displayFeedPosts[index][arrayName].push(user._id.$oid)
            }
        }
        else {
            let likeIndex = displayFeedPosts[index][arrayName].findIndex(like => like === user._id.$oid)
            if (likeIndex > -1) {
                displayFeedPosts[index][arrayName].splice(likeIndex, 1)
            }
        }
    }

    return (
        <View style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            {/* <MyDrawer/> */}
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <View style={{ zIndex: 9999, }}>
                <PostInputPopup onSubmitEditing={() => { getArticleData() }} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("homepage_post_placeholder")} />
                {/* <ModalMenu ref={refModalMenu} /> */}
                {/* <CommentInputPopup modalVisible={modalVisible} closeModal={() => {setModalVisible(false)}}  blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"Leave your comment:"} /> */}
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, { flex: 1, marginTop: 30 }]}>
                    <View style={{ height: 110 }}>
                        <HeaderLogoAndProfileImage user={user} img={user.picture} onPressImage={() => { refModalMenu.current.open() }} />
                    </View>
                    {displayFeedPosts.length === 0 &&
                        <>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={[styleSelected.textBold10DarkBlue]}>{t("homepage_hello")}, {user.name.split(" ")[0]}!</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <PostInputTransparent onSubmitEditing={() => { getArticleData() }} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("homepage_post_placeholder")} />
                            </View>
                            <View style={{ borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop: 10, width: "90%", alignSelf: "center" }}></View>
                            <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} onSelectSort={(val) => { if (val.value !== sortSelectValue.value) { console.log(val.value); console.log(sortSelectValue.value); setSortSelectOpen(false); sortPosts(val) } }} sortValue={sortSelectValue} onSelectFilter={(val) => { setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val) }} filterValue={filterSelectValue} />
                        </>
                    }

                    {isLoadingSort &&
                        <>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={[styleSelected.textBold10DarkBlue]}>{t("homepage_hello")}, {user.name.split(" ")[0]}!</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <PostInputTransparent onSubmitEditing={() => { getArticleData() }} userId={user._id.$oid} blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("homepage_post_placeholder")} />
                            </View>
                            <View style={{ borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop: 10, width: "90%", alignSelf: "center" }}></View>
                            <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} onSelectSort={(val) => { if (val.value !== sortSelectValue.value) { console.log(val.value); console.log(sortSelectValue.value); setSortSelectOpen(false); sortPosts(val) } else { console.log("HERE") } }} sortValue={sortSelectValue} onSelectFilter={(val) => { setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val) }} filterValue={filterSelectValue} />
                            <View style={{ paddingTop: -800 }}>
                                <CustomLoader height={200} customStyle={{ height: "75%" }} />
                            </View>
                        </>
                    }
                    {!isLoadingSort &&
                        <FlashList
                            ListHeaderComponent={<Header />}
                            ListHeaderComponentStyle={{ zIndex: 9999 }}
                            data={displayFeedPosts}
                            renderItem={({ item, index }) => { return <Item postContent={item} index={index} /> }}
                            keyExtractor={item => item._id.$oid}
                            // style={{zIndex:-5}}
                            removeClippedSubviews={false}
                            estimatedItemSize={194}
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}