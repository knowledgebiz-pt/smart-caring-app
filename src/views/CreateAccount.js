import React, { useEffect, useRef, useState, useCallback } from 'react'
import { TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StatusBar, ScrollView, Appearance, useColorScheme, Platform, View, Text, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from "expo-image-picker"
import Loader from '../components/Loader'
import ButtonOutlinePrimary from '../components/ButtonOutlinePrimary'
import ButtonOutlineSuccess from '../components/ButtonOutlineSuccess'
import InputTransparent from '../components/InputTransparent'
import InputTransparentLabelAbove from '../components/InputTransparentLabelAbove'
import InputDefault from '../components/InputDefault'
import ButtonOutlineSuccessIcon from '../components/ButtonOutlineSuccessIcon'
import ButtonOutlinePrimaryIcon from '../components/ButtonOutlinePrimaryIcon'
import ButtonOutlineDarkBlueIcon from '../components/ButtonOutlineDarkBlueIcon'
import TogglerTransparentLabelAbove from "../components/TogglerTransparentLabelAbove"
import TogglerTransparentLabelLeft from '../components/TogglerTransparentLabelLeft'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UserService} from "smart-caring-client/client"

export default function CreateAccount({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [name, setName] = useState("")
    const [gender, setGender] = useState("M")
    const [role, setRole] = useState(null)
    const [visibility, setVisibility] = useState(false)
    const [language, setLanguage] = useState("en")
    const [phone, setPhone] = useState(null)

    const [indexSelectedButton, setIndexSelectedButton] = useState(null)

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: .2,
        allowsMultipleSelection: false
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const launchLibrary = async () => {
        const result = await launchImageLibrary({}, (res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        console.log('OPEN', CreateAccount.name, 'SCREEN')
        console.warn(route)
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
                        <Text style={[styleSelected.textBold20DarkBlue, {marginTop: 45, textAlign: "center"}]}>Create an account</Text>
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                style={[styleSelected.avatar, {alignSelf: "center"}]}
                                source={{uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                            />
                        </TouchableOpacity>

                    {/* </View> */}
                    <View style={{flex: 1, width: "80%", alignSelf: "center", marginTop: 20, justifyContent: "space-evenly"}}>
                        {/* <InputDefault input={name} setInput={setName} lineFocusColor="#A8A8A8" inputColor="black" lineUnfocusColor="#A8A8A8" placeholderFocusColor="#030849" placeholderUnfocusColor="#030849" placeholder={"Name"} /> */}
                        <InputTransparentLabelAbove onChangeText={(text) => setName(text)} fontSize={13} inputColor={colors.BaseSlot3} fullWidth={true} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"Name"}/>
                        <View style={{marginTop: 7}}>
                            <TogglerTransparentLabelAbove onPress={(value) => {setGender(value)}} hasBorder={false} fullWidth={true} label={"Gender"} optionOneLabel={"Masculine"} optionOneValue={"M"} optionTwoLabel={"Feminine"} optionTwoValue={"F"}/>
                        </View>
                        <Text style={[styleSelected.textRegular13DarkBlue, {marginLeft: 30, marginTop: 7, marginBottom: 6}]}>Which one describes you best?</Text>
                        <ButtonOutlineSuccessIcon styleButton={{backgroundColor: indexSelectedButton === "1" ? colors.BaseSlot4 : "transparent"}} styleText={{color: indexSelectedButton === "1" ? colors.BaseSlot1 : colors.BaseSlot4}} styleImage={{tintColor: indexSelectedButton === "1" ? colors.BaseSlot1 : colors.BaseSlot4}} onPress={() => {setIndexSelectedButton("1"); setRole("Caregiver")}}  fullWidth={true} title={"Caregiver"} />
                        <ButtonOutlinePrimaryIcon styleButton={{backgroundColor: indexSelectedButton === "2" ? colors.BaseSlot2 : "transparent"}} styleText={{color: indexSelectedButton === "2" ? colors.BaseSlot1 : colors.BaseSlot2}} styleImage={{tintColor: indexSelectedButton === "2" ? colors.BaseSlot1 : colors.BaseSlot2}} onPress={() => {setIndexSelectedButton("2"); setRole("Health Professional")}} fullWidth={true} title={"Health Professional"} />
                        <ButtonOutlineDarkBlueIcon styleButton={{backgroundColor: indexSelectedButton === "3" ? "#030849" : "transparent"}} styleText={{color: indexSelectedButton === "3" ? colors.BaseSlot1 : "#030849"}} styleImage={{tintColor: indexSelectedButton === "3" ? colors.BaseSlot1 : "#030849"}} onPress={() => {setIndexSelectedButton("3"); setRole("Patient")}} fullWidth={true} title={"Patient"} />
                        <View style={{width: "40%", alignSelf: "flex-end", marginRight: 65}}>
                            <TogglerTransparentLabelLeft onPress={(value) => {setVisibility(value)}} hasBorder={false} fullWidth={true} label={"Visibility"} optionOneLabel={"On"} optionOneValue={true} optionTwoLabel={"Off"} optionTwoValue={false}/>
                        </View>
                        <TogglerTransparentLabelAbove hasBorder={false} fullWidth={true} label={"Language"} optionOneLabel={"Portuguese"} optionOneValue={"1"} optionTwoLabel={"English"} optionTwoValue={"2"}/>
                        <InputTransparentLabelAbove onChangeText={(text) => {setPhone(text); console.log(phone)}} fontSize={13} inputColor={colors.BaseSlot3} inputMode='tel' fullWidth={true} hasBorder={true} borderColor={colors.BaseSlot5} placeholder={"Phone number"}/>
                        


                    </View>
                    <View style={{flex: 1, width:"100%", alignSelf: "center", justifyContent: "space-evenly"}}>
                        <Text style={[styleSelected.textDisclaimer, {width:"80%", marginTop: 14, alignSelf: "center"}]}>By clicking Continue, Sign up with Google, or Sign up with Facebook, you agree to our <Text style={styleSelected.textBold}>Terms and Conditions</Text> and <Text style={styleSelected.textBold}>Privacy Statement</Text>.</Text>
                    </View>
                    <View style={{flex: 1, width:"100%", alignSelf: "center", marginTop: 14, marginBottom: 14, justifyContent: "space-evenly"}}>
                        <ButtonOutlinePrimary event={() => { 
                            setIsLoading(true)
                            UserService.createUser({
                                email: route.params.email,
                                password: route.params.password,
                                name: name,
                                user_gender: gender, // M, F
                                UserType: role, // caregiver, health professional, patient
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
                                console.warn(res.data)
                                setIsLoading(false)
                            }).catch((e) => {
                                console.error(e)
                                setIsLoading(false)
                            })
                         }} title={"Let's go!"} />
                    </View>
                </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}