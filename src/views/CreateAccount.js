import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StatusBar, ScrollView, Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as ImagePicker from "expo-image-picker"
import Loader from '../components/Loader'
import ButtonOutlinePrimary from '../components/ButtonOutlinePrimary'
import InputTransparentLabelAbove from '../components/InputTransparentLabelAbove'
import ButtonOutlineSuccessIcon from '../components/ButtonOutlineSuccessIcon'
import ButtonOutlinePrimaryIcon from '../components/ButtonOutlinePrimaryIcon'
import ButtonOutlineDarkBlueIcon from '../components/ButtonOutlineDarkBlueIcon'
import TogglerTransparentLabelAbove from "../components/TogglerTransparentLabelAbove"
import TogglerTransparentLabelLeft from '../components/TogglerTransparentLabelLeft'
import { launchImageLibrary } from 'react-native-image-picker';
import { UserService } from "@knowledgebiz/smart-caring-client/client"
import DatePickerTransparentLabelAbove from '../components/DatePickerTransparentLabelAbove'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PhoneInputTransparentLabelAbove from '../components/PhoneInputTransparentLabelAbove'
import Toast from 'react-native-toast-message'
import { CommonActions } from '@react-navigation/native'

import { useTranslation } from "react-i18next"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CreateAccount({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState(new Date())
    const [gender, setGender] = useState("M")
    const [role, setRole] = useState(null)
    const [visibility, setVisibility] = useState(true)
    const [language, setLanguage] = useState("en")
    const [phone, setPhone] = useState(null)
    const [showPicker, setShowPicker] = useState(false)

    const [indexSelectedButton, setIndexSelectedButton] = useState(null)

    const [image, setImage] = useState(null);

    const {t, i18n} = useTranslation()

    const handleSubmit = () => {
        if (name.length > 0 && role !== null) {
            setIsLoading(true)
            UserService.createUser({
                email: route.params.email,
                password: route.params.password,
                name: name,
                user_gender: gender, // M, F
                UserType: role, // caregiver, health professional, patient
                birthDate: birthDate.getDate()+"/"+(birthDate.getMonth()+1)+"/"+birthDate.getFullYear(),
                visibilityUser: visibility,
                phone: phone,
                picture: image,
                address: {
                    city: "",
                    country: "",
                    door_number: "",
                    postal_code: "",
                    street: ""
                }
            }).then((res) => {
                i18n.changeLanguage(language)
                AsyncStorage.setItem("@lang", language)
                showToast(t("create_account_toast_success"), "success")
                setIsLoading(false)
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Features' }],
                    })
                )
            }).catch((e) => {
                console.error(e)
                setIsLoading(false)
                showToast(t("create_account_toast_error"), "error")
            })
        }
        else {
            showToast(t("register_no_fields"))
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: .2,
        allowsMultipleSelection: false,
        base64: true
        });
        
        let base64 = result.assets[0].base64
        console.log(result);
        
        UserService.uploadUserImage({
            base64: result.assets[0].base64
        })
          .then(res => {
            setImage(res.data);
          })
          .catch(e => {
            console.error(e);
          });
    };

    const launchLibrary = async () => {
        const result = await launchImageLibrary({}, (res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        console.log('OPEN', CreateAccount.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            console.log('SCREEN', CreateAccount.name, 'CLOSE')
        }
    }, [])
    Appearance.getColorScheme()
    Appearance.addChangeListener(({ colorScheme }) => {
        console.log('COLOR THEME WAS ALTER')
        console.log(colorScheme)
        if (Platform.OS === 'android')
            NavigationBar.setBackgroundColorAsync(colorScheme === 'light' ? colors.BaseSlot1 : colors.BaseSlot1)
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

    const showToast = (msg, type="success") => {
        // Types: success, error, info
        Toast.show({type: type, text1: msg, position: 'bottom'})
    }

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, styleSelected.AndroidSafeArea, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1}}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 0}
            >
            {/* <KeyboardAwareScrollView style={{flex:1}}> */}
                <ScrollView style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
                    {/* <View style={{flex:1}}> */}
                        <Text style={[styleSelected.textBold20DarkBlue, {marginTop: 45, textAlign: "center"}]}>{t("register_title")}</Text>
                        <TouchableOpacity style={{marginTop:20}} onPress={pickImage}>
                            <Image
                                style={[styleSelected.avatar, {alignSelf: "center"}]}
                                source={{uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                            />
                            <View style={styleSelected.plusCircleAvatar}>                                
                                <MaterialCommunityIcons
                                    name={'plus'}
                                    size={25}
                                    color={colors.BaseSlot1}
                                />
                            </View>
                        </TouchableOpacity>

                    {/* </View> */}
                    <View style={{flex: 1, width: "80%", alignSelf: "center", marginTop: 20, justifyContent: "space-evenly"}}>
                        {/* <InputDefault input={name} setInput={setName} lineFocusColor=colors.BaseSlot5 inputColor="black" lineUnfocusColor=colors.BaseSlot5 placeholderFocusColor="#030849" placeholderUnfocusColor="#030849" placeholder={"Name"} /> */}
                        <InputTransparentLabelAbove onChangeText={(text) => setName(text)} fontSize={13} inputColor={colors.BaseSlot3} fullWidth={true} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("name")+"*"}/>
                        <View style={{marginTop: 7, flexDirection: "row"}}>
                            <DatePickerTransparentLabelAbove viewWidth={"20%"} event={() => {setShowPicker(true)}} showPicker={showPicker} onDateChange={(date) => {setShowPicker(false);setBirthDate(new Date(date["nativeEvent"]["timestamp"]))}} date={birthDate} placeholder={t("age")+"*"}/>
                            <TogglerTransparentLabelAbove viewWidth={"80%"} onPress={(value) => {setGender(value)}} hasBorder={false} fullWidth={true} label={t("gender")+"*"} optionOneLabel={t("male")} optionOneValue={"M"} optionTwoLabel={t("female")} optionTwoValue={"F"}/>
                        </View>
                        <Text style={[styleSelected.textRegular13DarkBlue, {marginLeft: 30, marginTop: 7, marginBottom: 6}]}>{t("create_account_role")}</Text>
                        <ButtonOutlineSuccessIcon styleButton={{backgroundColor: indexSelectedButton === "1" ? colors.BaseSlot4 : "transparent"}} styleText={{color: indexSelectedButton === "1" ? colors.BaseSlot1 : colors.BaseSlot4}} styleImage={{tintColor: indexSelectedButton === "1" ? colors.BaseSlot1 : colors.BaseSlot4}} onPress={() => {setIndexSelectedButton("1"); setRole("Caregiver")}}  fullWidth={true} title={t("caregiver")} />
                        <ButtonOutlinePrimaryIcon styleButton={{backgroundColor: indexSelectedButton === "2" ? colors.BaseSlot2 : "transparent"}} styleText={{color: indexSelectedButton === "2" ? colors.BaseSlot1 : colors.BaseSlot2}} styleImage={{tintColor: indexSelectedButton === "2" ? colors.BaseSlot1 : colors.BaseSlot2}} onPress={() => {setIndexSelectedButton("2"); setRole("Health Professional")}} fullWidth={true} title={t("healthPro")} />
                        <ButtonOutlineDarkBlueIcon styleButton={{backgroundColor: indexSelectedButton === "3" ? "#030849" : "transparent"}} styleText={{color: indexSelectedButton === "3" ? colors.BaseSlot1 : "#030849"}} styleImage={{tintColor: indexSelectedButton === "3" ? colors.BaseSlot1 : "#030849"}} onPress={() => {setIndexSelectedButton("3"); setRole("Patient")}} fullWidth={true} title={t("patient")} />
                        <View style={{width: "40%", alignSelf: "flex-end", marginRight: 110}}>
                            <TogglerTransparentLabelLeft onPress={(value) => {setVisibility(value)}} hasBorder={false} fullWidth={true} label={t("create_account_share")} optionOneLabel={t("yes")} optionOneValue={true} optionTwoLabel={t("no")} optionTwoValue={false}/>
                        </View>
                        <TogglerTransparentLabelAbove onPress={(value) => {setLanguage(value)}} hasBorder={false} fullWidth={true} label={t("language")} optionOneLabel={t("portuguese")} optionOneValue={"pt"} optionTwoLabel={t("english")} optionTwoValue={"en"}/>
                        <PhoneInputTransparentLabelAbove onChangeText={(text) => {setPhone(text); console.log(phone)}} fullWidth={true} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={t("create_account_phone")} />
                    </View>
                    <View style={{flex: 1, width:"100%", alignSelf: "center", justifyContent: "space-evenly"}}>
                        <Text style={[styleSelected.textDisclaimer, {width:"80%", marginTop: 14, alignSelf: "center"}]}>{t("create_account_terms_begin")}<Text style={styleSelected.textBold}>{t("create_account_terms_conditions")}</Text>{t("create_account_terms_and")}<Text style={styleSelected.textBold}>{t("create_account_terms_privacy")}</Text>.</Text>
                        <Text style={[styleSelected.textRegular10Gray, {width:"80%", marginTop: 14, alignSelf: "center"}]}>{t("create_account_mandatory")}</Text>
                    </View>
                    <View style={{flex: 1, width:"100%", alignSelf: "center", marginTop: 14, marginBottom: 14, justifyContent: "space-evenly"}}>
                        <ButtonOutlinePrimary event={() => { handleSubmit()}} title={t("create_account_button")} />
                    </View>
                </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}