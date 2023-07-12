import React, { useEffect, useState, useCallback, useRef } from 'react'
import { SafeAreaView, StatusBar, FlatList, SectionList, Appearance, useColorScheme, ScrollView, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import HeaderLogoAndProfileImage from '../components/HeaderLogoAndProfileImage'
import { UserService } from "smart-caring-client/client"
import PostInputTransparent from '../components/PostInputTransparent'
import SelectTransparent from '../components/SelectTransparent'
import FeedPost from '../components/FeedPost'
import PostInputPopup from '../components/PostInputPopup'

export default function HomePage({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [filterSelectOpen, setFilterSelectOpen] = useState(false)
    const [sortSelectValue, setSortSelectValue] = useState({label: "Recent"})
    const [filterSelectValue, setFilterSelectValue] = useState(null)
    
    const sortRef = useRef()
    const filterRef = useRef()

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

    useEffect(() => {
        UserService.getUserDataByIdUser("Ruben@teste.com", "Teste").then(res => {
            setUser(res.data)
            setName(res.data.name)
            setIsLoading(false)
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

    const Item = ({postContent, index}) => (<>
        {index === 0  && <>
            
                <View style={{alignSelf: "center"}}>
                    <Text style={[styleSelected.textBold10DarkBlue, {marginTop: -15}]}>Hello, {name.split(" ")[0]}!</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <PostInputTransparent blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"}/>
                </View>
                <View style={{borderBottomColor: "rgba(28, 163, 252, 0.1)", borderBottomWidth: 1, marginTop:10, width: "90%", alignSelf: "center"}}></View>
                <View style={{flexDirection: "row", width: "90%", alignSelf: "center", paddingBottom:5, zIndex: 9999}}>
                    <SelectTransparent ref={sortRef} otherRefs={[filterRef]} onPress={() => {setSortSelectOpen(!sortSelectOpen); setFilterSelectOpen(false)}} onSelectItem={(val) => {setSortSelectValue(val); setSortSelectOpen(false)}} selectedValue={sortSelectValue} open={sortSelectOpen} placeholder={"Sort by: "} hasBorder={1} displaySelectedOption={true} labelTextColor={colors.BaseSlot2} borderColor={colors.BaseSlot2} viewWidth="50%" width='61%' align='left' />
                    <SelectTransparent ref={filterRef} otherRefs={[sortRef]} onPress={() => {setSortSelectOpen(false); setFilterSelectOpen(!filterSelectOpen)}} onSelectItem={(val) => {setFilterSelectValue(val); setFilterSelectOpen(false)}} selectedValue={filterSelectValue} open={filterSelectOpen} placeholder={"Filters"} displaySelectedOption={false} labelTextColor={colors.BaseSlot1} backgroundColor={colors.BaseSlot2} hasBorder={false} viewWidth="50%" width='39%' align='right'  />
                </View>
                </>}
        <View style={{flexDirection: "row", width: "90%", alignSelf: "center", marginTop: 20}}>
            <FeedPost postContent={postContent} feedRole={postContent.userRole} buttonColor={"#030849"}/>
        </View>
        </>
    )
    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
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
                    <FlatList
                        data={mockFeedPosts}
                        renderItem={({item, index}) => {return <Item postContent={item} index={index}/>}}
                        keyExtractor={item => item.id}
                        style={{zIndex:-5}}
                    />
                    <View style={{zIndex:9999, }}>
                        <PostInputPopup blurOnSubmit={false} img={user.picture} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"What's on your mind?"} />
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}