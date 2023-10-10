import React, { useEffect, useState, useRef } from 'react'
import { useColorScheme, View, Image, TouchableOpacity, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ModalMenu from './ModalMenu';
import RBSheet from 'react-native-raw-bottom-sheet';
import { OpenAPI } from 'smart-caring-client/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native'
import { useTranslation } from "react-i18next"
import { useSelector } from 'react-redux';

/***
 * @param img: string - URI of the user's profile image
 */

export default function HeaderLogoAndProfileImage({img, onPressImage, user, refreshItems}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const navigation = useNavigation()

    const {t, i18n} = useTranslation()

    const [image, setImage] = useState(null);
    const [userType, setUserType] = useState("")
    const refModalMenu = useRef()

    const userInfo = useSelector((state) => state.user)

    const options = [
        {id: 1,name:t("homepage_menu_profile"), value:"profile", icon: "user", iconType: "FontAwesome"},
        {id: 2,name:t("homepage_menu_privacy_policy"), value:"privacypolicy", icon: "shield-account", iconType: "MaterialCommunityIcons"},
        {id: 3,name:t("homepage_menu_terms_use"), value:"termsofuse", icon: "file-check", iconType: "MaterialCommunityIcons"},
        {id: 4,name:t("homepage_menu_language"), value:"language", icon: "language", iconType: "FontAwesome"},
        {id: 5,name:t("homepage_menu_logout"), value:"logout", icon: "logout", iconType: "MaterialCommunityIcons"},
    ]

    useEffect(() => {
        setImage(img)
        console.log("USER INFO", userInfo)
        if (userInfo.user_type.toLowerCase() === "health professional") {
            setUserType(require("../../assets/images/Caregiver.png"))
        }
        else if (userInfo.user_type.toLowerCase() === "caregiver") {
            setUserType(require("../../assets/images/Caregiver.png"))
        }
        else if (userInfo.user_type.toLowerCase() === "patient") {
            setUserType(require("../../assets/images/Patient.png"))
        }
    }, [])

    const optionPressed = (option) => {
        console.log("OPTION", option)
        if (option.value === "logout") {
            AsyncStorage.clear()
            refModalMenu.current.close()
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
            )
        }
        else if (option.value === "profile") {
            navigation.navigate("Profile")
        }
        else if (option.value === "language") {
            if (i18n.language === "pt") {
                AsyncStorage.setItem("@lang", "en").then(() => {
                    i18n.changeLanguage("en")
                    refreshItems()
                })
            }
            else {
                AsyncStorage.setItem("@lang", "pt").then(() => {
                    i18n.changeLanguage("pt")
                    refreshItems()

                })
            }
        }
        else if (option.value === "privacypolicy") {
            navigation.navigate("PolicyPrivacy")
        }
    }

    return (
        <View style={{flexDirection: "row",}}>
            <Image source={require("../../assets/images/logo.png")} style={styleSelected.logoLeftSide} resizeMode='contain' />
            <View style={{justifyContent:"center", flex:1, alignItems:"center", right: 40}}>
                <TouchableOpacity onPress={() => {refModalMenu.current.open()}} style={[styleSelected.avatarRightSide]}>
                    <Image
                        style={[styleSelected.avatar, styleSelected.avatarRightSide]}
                        source={{uri: userInfo.picture ? userInfo.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                    />
                    {/* Icon style is very specific for this case and will likely not work in different situations. */}
                    <View style={styleSelected.menuCircleAvatarRightSide}>
                        <MaterialCommunityIcons
                            name={'menu'}
                            size={20}
                            color={"#030849"}
                            style={{alignSelf:"center"}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* <View style={[styleSelected.feedPostContainer, { zIndex: 99999999 }]}> */}
                <RBSheet 
                    height={430}
                    customStyles={{
                    wrapper: {
                        backgroundColor: "#00000070"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        backgroundColor: "#030849"

                    }
                    }} ref={refModalMenu}>
                    <View style={{flex:1,padding:25, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                        {/* <View style={{flexDirection: "row"}}>
                            <Text style={{color:"white", fontSize:14}}>{user.name}</Text>
                            <Image style={[{width: 35, height: 20, marginLeft: 10, tintColor:"white"}, ]} source={userType}/>
                        </View> */}
                        <View style={{flex: 1,flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
                            <View style={{flex: .19, height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Image
                                    style={[styleSelected.avatar, { height: 50, width: 50}]}
                                    source={{uri: userInfo.picture ? userInfo.picture : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                                />
                            </View>
                            <View style={{flex: 1, flexDirection:"column", justifyContent:"center", alignItems:"flex-start"}}>
                                <Text style={{color:"white", fontSize:14}}>{userInfo.name}</Text>
                                <Image style={[{width: 35, height: 35,tintColor:"white"}, ]} resizeMode='contain' source={userType}/>
                            </View>

                        </View>
                        {options.map(list => (
                            <View style={{flex:1}}>
                                <TouchableOpacity style={{flexDirection:"row",alignItems:"center", backgroundColor:"#1CA3FC", marginTop: 15, borderRadius: 10, height: 50}}
                                    key={list.id}
                                    onPress={() => optionPressed(list)}
                                >
                                    <View style={{flex:.5, height:"100%", justifyContent:"center", alignItems:"center"}}>
                                        {list.iconType === "FontAwesome" && <FontAwesome style={{fontSize:26,color:"white"}} name={list.icon}  />}
                                        {list.iconType === "MaterialCommunityIcons" && <MaterialCommunityIcons style={{fontSize:26,color:"white"}} name={list.icon}  />}
                                    </View>
                                    <View style={{flex:2, height:"100%", justifyContent:"center", alignItems:"flex-start"}}>
                                        <Text style={[{fontSize:16, color:"white"}, list.iconType === "FontAwesome" && {marginLeft: 0}]}>{list.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        
                    </View>
                </RBSheet>
            {/* </View> */}
        </View>
        
    )
}