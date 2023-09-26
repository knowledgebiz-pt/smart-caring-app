import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Linking } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import ButtonPrimary from '../components/ButtonPrimary'
import { useTranslation } from "react-i18next"
import SortAndFilterSelects from '../components/SortAndFilterSelects'
import SearchInput from '../components/SearchInput'
import { FontAwesome } from '@expo/vector-icons'
import ButtonSuccess from '../components/ButtonSuccess'
import { ToolboxService } from 'smart-caring-client/client'


export default function ToolBox({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [indexSelected, setIndexSelected] = useState(0)

    const [topPopup, setTopPopup] = useState(0)
    const [leftPopup, setLeftPopup] = useState(0)
    const [listToSearch, setListToSearch] = useState(["Oscar", "Silva"])
    const [showPopup, setShowPopup] = useState(false)

    const [displayData, setDisplayData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [sortSelectOpen, setSortSelectOpen] = useState(false);

    const {t, i18n} = useTranslation()

    const [sortItems, setSortItems] = useState([
        { label: t("toolbox_most_stars"), value: 'mostStars' },
        { label: t("toolbox_least_stars"), value: 'leastStars' },
        { label: t("toolbox_most_languages"), value: 'mostLang' },
        { label: t("toolbox_least_languages"), value: 'leastLang' },
    ])

    const [sortSelectValue, setSortSelectValue] = useState()

    const searchRef = useRef(null)

    const sortFunction = (val) => {
        console.log(val)
        if (sortSelectValue && val.value === sortSelectValue.value) {
            console.log("?????")
            return false
        }
        else {
            setSortSelectValue(val)
            if (val.value === "mostStars") {                
                displayData.sort(function(a, b){return b.toolbox_rating - a.toolbox_rating})
                console.log(displayData[0])
            }
            else if (val.value === "leastStars") {
                displayData.sort(function(a, b){return a.toolbox_rating - b.toolbox_rating})
                
            }
            else if (val.value === "mostLang") {
                displayData.sort(function(a, b){return b.languageNumber - a.languageNumber})
            }
            else if (val.value === "leastLang") {
                displayData.sort(function(a, b){return a.languageNumber - b.languageNumber})

            }
        }
    }


    useEffect(() => {
        ToolboxService.getToolBoxAllProducts().then(res => {
            let data = res.data.items
            for (let i = 0; i < data.length; i++) {
                lang = i18n.language
                let descSlugs = data[i].toolbox_description.split(";;;")
                let langSlugs = data[i].toolbox_languages.split(";;;")
                let linkSlugs = data[i].toolbox_website.split(";;;")
                if (lang === "en") {
                    data[i]["toolbox_description"] = descSlugs[0].replace("en:", "")
                    data[i]["toolbox_languages"] = langSlugs[0].replace("en:", "")
                    data[i]["languageNum"] = langSlugs[0].split(",").length
                }
                else if (lang === "pt") {
                    data[i]["toolbox_description"] = descSlugs[1].replace("pt:", "")
                    data[i]["toolbox_languages"] = langSlugs[1].replace("pt:", "")
                    data[i]["languageNum"] = langSlugs[1].split(",").length

                }
                if (linkSlugs[0] !== "website:null") {
                    data[i]["websiteUrl"] = linkSlugs[0].replace("website:", "")
                }
                else {
                    data[i]["websiteUrl"] = null
                }
                if (Platform.OS === "ios") {
                    if (linkSlugs[1] !== "ios:null") {
                        data[i]["appUrl"] = linkSlugs[1].replace("ios:", "")
                    }
                    else {
                        data[i]["appUrl"] = null
                    }
                }
                else {
                    if (linkSlugs[2] !== "android:null") {
                        data[i]["appUrl"] = linkSlugs[2].replace("android:", "")
                    }
                    else {
                        data[i]["appUrl"] = null
                    }
                }
                data[i]["stars"] = ["star-o", "star-o", "star-o", "star-o", "star-o",]
                for (let ind = 0; ind < parseInt(data[i].toolbox_rating); ind++) {
                    data[i]["stars"][ind] = "star"
                }
            }
            data.sort(function(a, b){return b.toolbox_rating - a.toolbox_rating})
            setDisplayData(data)
            setOriginalData(data)
            console.log('OPEN', ToolBox.name, 'SCREEN')
            //For test loading
            sortFunction({ label: t("toolbox_most_stars"), value: 'mostStars' })

        }).catch(error => console.error(error))
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', ToolBox.name, 'CLOSE')
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
    if (!isLoading) {
        return (
            <Loader />
        );
    }

    const searchFunction = (val) => {
        setSearch(val)
        if (val) {
            let newData = displayData.filter((x) => {
                return x.toolbox_name.includes(val)
            })
            setDisplayData(newData)
        }
        else {
            // setDisplayData([...originalData])
            changeView(indexSelected, true)
        }
    }

    const changeView = (i, isEmpty=false) => {
        let data = null
        console.log(originalData)
        switch (i) {
            case 0:
                filterOnChangeView(originalData, isEmpty)
                break
            case 1:
                data = originalData.filter((item) => {
                    return item.appUrl !== null
                })
                filterOnChangeView(data, isEmpty)

                break
            case 2:
                data = originalData.filter((item) => {
                    return item.websiteUrl !== null
                })
                filterOnChangeView(data, isEmpty)
                break
        }
    }

    const filterOnChangeView = (data, isEmpty=false) => {
        console.log(search)
        if (search && !isEmpty) {
            let newData = data.filter((x) => {
                return x.toolbox_name.includes(search)
            })
            setDisplayData(newData)
        }
        else { 
            setDisplayData(data)
        }
    }

    const Item = ({item, index}) => (
        <View style={{  borderColor: colors.BaseSlot5, borderWidth: .5, flex:1, width: "90%", alignSelf: "center", marginTop: 10, borderRadius: 20, overflow: "hidden", flexDirection: "row", padding:10 }}>
            <View style={{ flex: 1,  marginLeft:-5 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={{ uri: item.toolbox_image }}
                        style={{ width: 80, height: 80}}
                        resizeMode='contain' />
                </View>
                <View style={{ flex: 2, alignItems: "center" }}>
                    <View style={{ width: "90%" }}>
                        {item.appUrl !== null && <ButtonPrimary
                            fontSize={13}
                            borderRadius={13}
                            height={40}
                            event={() => {Linking.openURL(item.appUrl)}}
                            title={t("toolbox_download_app")}
                            textAlign={'center'}
                            fullWidth={true} />
                        }
                            
                        {item.websiteUrl !== null && 
                        <View style={{ paddingTop: item.appUrl !== null ? 10 : 0 }}>
                            <ButtonSuccess
                                fontSize={13}
                                borderRadius={13}
                                height={40}
                                textAlign={'center'}
                                event={() => {Linking.openURL(item.websiteUrl)}}
                                title={t("toolbox_visit_website")}
                                fullWidth={true} />
                        </View>
                        }
                    </View>
                </View>
            </View>
            <View style={{ flex: 2, paddingLeft:5 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{flexDirection:"row", flex:1}}>
                        <View style={{flex:1}}>
                            <Text style={[styleSelected.textBold20DarkBlue, {fontSize:16}]}>{item.toolbox_name}</Text>
                        </View>
                        <View style={{flex:.7, right:0, flexDirection:"row"}}>
                            { item.stars.map(
                                el => 
                                    <FontAwesome style={{ paddingRight:2 }} size={17} name={el} color={"#FDC54E"} />
                                )
                            }
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center", paddingTop:5, paddingBottom:15 }}>
                    <Text style={{ color: colors.BaseSlot2, textDecorationLine:'underline', fontStyle:'italic', fontSize:11 }}>{item.websiteUrl !== null ? item.websiteUrl : ""}</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", paddingBottom:15}}>
                    <Text style={{fontSize:12}}>{item.toolbox_description}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{fontSize:12, fontWeight:600, color:colors.BaseSlot3}}>{t("languages")}</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            <Text style={{ marginRight: 2, color: colors.BaseSlot3, fontSize:11 }}>{item.toolbox_languages}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{fontSize:12, fontWeight:600, color:colors.BaseSlot3}}>{t("toolbox_pricing")}</Text>
                        <Text style={{ marginRight: 2, color: colors.BaseSlot3, fontSize:11 }}>{item.toolbox_price === "0" ? t("toolbox_free") : item.toolbox_price}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styleSelected.textBold20DarkBlue}>{t("navbar_toolbox")}</Text>
                </View>
                <View style={{ flex:.2, justifyContent: "center", alignItems: "center", }}>
                    <View style={{ borderWidth: .5, borderColor: colors.BaseSlot5, width: "90%", flexDirection: "row", borderRadius: 30, padding: 3 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                            <FontAwesome size={15} color={colors.BaseSlot5} name='search' />
                        </View>
                        <SearchInput value={search} placeholder={t("search")} onChangeText={(val) => {searchFunction(val)}} />
                    </View>
                </View>
                <View style={{ height: 70, justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ height: 40, borderColor: colors.BaseSlot5, borderWidth: .5, width: "90%", borderRadius: 40, flexDirection: "row" }}>

                        <TouchableOpacity
                            onPress={() => {setIndexSelected(0); changeView(0)}}
                            style={{ borderRightWidth: .5, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", borderTopLeftRadius: indexSelected == 0 ? 20 : 0, borderBottomLeftRadius: indexSelected == 0 ? 20 : 0, backgroundColor: indexSelected == 0 ? colors.BaseSlot6 : "transparent" }}>
                            <Text style={[{ fontSize:13, color: indexSelected == 0 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("filter_all")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {setIndexSelected(1); changeView(1)}}
                            style={{ borderRightWidth: .5, borderRightColor: colors.BaseSlot5, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: indexSelected == 1 ? colors.BaseSlot2 : "transparent" }}>
                            <Text style={[{ fontSize:13, color: indexSelected == 1 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("apps")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {setIndexSelected(2); changeView(2)}}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: indexSelected == 2 ? colors.BaseSlot4 : "transparent" }}>
                            <Text style={[{ fontSize:13, color: indexSelected == 2 ? colors.BaseSlot1 : colors.BaseSlot5 }]}>{t("websites")}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ height: 1, backgroundColor: colors.BaseSlot5, width: "90%" }} />
                </View>
                <View style={{flex:2}}>
                    <SortAndFilterSelects sortItems={sortItems} filterItems={[]} onSelectSort={(val) => { setSortSelectOpen(false); sortFunction(val) }} sortValue={sortSelectValue} onSelectFilter={(val) => {return "a"}} filterValue={{}} />
                    <FlatList 
                        data={displayData}
                        renderItem={({ item, index }) => { return <Item item={item} index={index} /> }}
                        // keyExtractor={item => item._id.$oid}
                    />

                </View>
                {
                    showPopup && (
                        <View style={{ position: "absolute", backgroundColor: "blue", height: 100, width: 100, left: leftPopup, top: topPopup }}>
                            {
                                listToSearch.map((item, index) => {
                                    return (
                                        <Text>{item}</Text>
                                    )
                                })
                            }
                        </View>
                    )
                }

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}