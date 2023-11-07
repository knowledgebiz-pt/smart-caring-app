import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import { FlashList } from '@shopify/flash-list'
import { FontAwesome } from '@expo/vector-icons'
import JournalEntryCreationPopup from '../components/JournalEntryCreationPopup'
import JournalEntry from '../components/JournalEntry'
import { DiaryService } from 'smart-caring-client/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useTranslation } from "react-i18next"
import SearchBar from '../components/SearchBar'
import SingleSelect from '../components/SingleSelect'

export default function Journal({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [journalEntries, setJournalEntries] = useState([])

    const showToast = (msg, type = "success") => {
        // Types: success, error, info
        Toast.show({ type: type, text1: msg, position: 'bottom' })
    }

    const { t, i18n } = useTranslation()

    const [originalData, setOriginalData] = useState([...journalEntries])

    const [modalVisible, setModalVisible] = useState(false)

    const [searchText, setSearchText] = useState(null)

    const [refresh, setRefresh] = useState(false)

    const [sortItems, setSortItems] = useState([
        { label: t('recent'), value: 'recent' },
        { label: t('old'), value: 'old' }
    ])

    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [sortSelectValue, setSortSelectValue] = useState({ label: t("recent"), value: 'recent' })

    useEffect(() => {
        AsyncStorage.getItem("@token").then(res => {
            DiaryService.getDiaryByIdUser(res).then(result => {
                let formattedData = []
                for (let i = 0; i < result.data.length; i++) {
                    let slugs = result.data[i].tags.split(";;;")
                    let entry = {
                        id: result.data[i]._id.$oid,
                        user_id: result.data[i].user_id,
                        title: result.data[i].title,
                        description: result.data[i].content,
                        category: slugs[0],
                        categoryColor: slugs[1],
                        date: slugs[2],
                    }
                    formattedData.push(entry)
                }
                setJournalEntries(formattedData)
                setIsLoading(false)
            }).catch(e => {
                if (e.status === 404) {
                    showToast(t("journal_toast_no_entries"), "info")
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    showToast(t("journal_toast_entries_get_error"), "error")
                }
            })
        })

        console.log('OPEN', Journal.name, 'SCREEN')
        return () => {
            console.log('SCREEN', Journal.name, 'CLOSE')
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

    const createEntry = (val) => {
        console.log(val)
        if (!val || val.description.length < 5) {
            showToast(t("journal_toast_entry_characters"), "error")
        }
        else {
            AsyncStorage.getItem("@token").then(res => {
                let formattedData = {
                    user_id: res,
                    title: val.title,
                    content: val.description,
                    anexed_file: "",
                    tags: val.category + ";;;" + val.categoryColor + ";;;" + val.date,
                    visibility: false
                }
                DiaryService.createDiary(formattedData).then(res => {
                    showToast(t("journal_toast_created_entry"), "success")
                    getJournalEntries()
                })

            })
        }
    }

    const getJournalEntries = () => {
        AsyncStorage.getItem("@token").then(res => {
            DiaryService.getDiaryByIdUser(res).then(result => {
                let formattedData = []
                for (let i = 0; i < result.data.length; i++) {
                    let slugs = result.data[i].tags.split(";;;")
                    let entry = {
                        id: result.data[i]._id.$oid,
                        user_id: result.data[i].user_id,
                        title: result.data[i].title,
                        description: result.data[i].content,
                        category: slugs[0],
                        categoryColor: slugs[1],
                        date: slugs[2],
                    }
                    formattedData.push(entry)
                }
                setJournalEntries(formattedData)
                setOriginalData(formattedData)
                setIsLoading(false)
            }).catch(e => {
                if (e.status === 404) {
                    showToast(t("journal_toast_no_entries"), "info")
                    setJournalEntries([])
                    setOriginalData([])
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    showToast(t("journal_toast_entries_get_error"), "error")
                }
            })
        })
    }

    const deleteEntry = (val) => {
        DiaryService.deleteDiaryByIdNews(val).then(res => {
            showToast(t("journal_toast_entry_deleted"), "success")
            setJournalEntries([])
            setOriginalData([])
            setTimeout(() => {
                getJournalEntries()

            }, 10)

        })
    }

    const searchFunction = (val) => {
        if (!searchText) {
            setOriginalData([...journalEntries])
        }
        setSearchText(val)
        if (val) {
            let newData = originalData.filter((x) => {
                return x.title.includes(val)
            })
            setJournalEntries([])
            setTimeout(() => {
                setJournalEntries(newData)
            }, 100)
        }
        else {
            setJournalEntries([])
            setTimeout(() => {
                setJournalEntries([...originalData])
            }, 100)
        }
    }

    const sortPosts = (val) => { // affects current displayFeedPosts
        if (sortSelectValue.value !== val.value) {
            setSortSelectValue(val)
            let tempHolder = journalEntries
            setJournalEntries([])
            setTimeout(() => {
                tempHolder.reverse()
                setJournalEntries(tempHolder)
            }, 10)
        }
    }

    const Header = ({ }) => (
        <>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "5%" }}></View>
                <SingleSelect dropDownContainerStyle={{
                    borderWidth: .5,
                    borderColor: colors.BaseSlot5,
                    }} 
                    styleDropdown={{ borderWidth: .5, borderColor: colors.BaseSlot5, 
                        color: "red", padding: 5, 
                        paddingLeft: 15, paddingRight: 15, 
                        borderRadius: 30, alignItems: "center", 
                        justifyContent: "center", minHeight: 30 
                    }}
                    placeholder={t("sort_by") + ": " + sortSelectValue.label}
                    onSelectItem={(val) => { setSortSelectOpen(false); sortPosts(val) }} 
                    onPress={() => { setSortSelectOpen(!sortSelectOpen) }} 
                    open={sortSelectOpen} items={sortItems}
                />
                <View style={{ width: "5%" }}></View>

            </View>
        </>
    )

    const EmptyList = () => (
        <>
            <View style={{ flex: 1, marginLeft: "10%", marginRight: "10%", alignItems: "center" }}>
                {originalData.length === 0 && <Text style={{ fontWeight: 600, marginTop: 50 }}>{t("journal_begin_message")}</Text>}
            </View>
        </>
    )

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'white'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10, marginTop: 25 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                {/* <View style={{zIndex: 99999}}>
                    <JournalEntryPopup />
                </View> */}
                <View style={{ zIndex: 9999, position: "absolute" }} >
                    <JournalEntryCreationPopup event={(val) => { createEntry(val); }} setModalVisible={setModalVisible} visible={modalVisible}/>
                </View>

                <View style={[styleSelected.backgroundPrimary, { flex: 1, }]}>
                    <View style={[styleSelected.backgroundPrimary, { flex: .065, justifyContent: "center", alignItems: "center", }]}>
                        <Text style={{ fontWeight: 600, color: "#030849", fontSize: 20 }}>{t("navbar_journal")}</Text>
                    </View>

                    <View style={{ flex: .085, justifyContent: "center", alignItems: "center", }}>                        
                        <SearchBar searchText={searchText} onChangeText={(val) => searchFunction(val)} />
                    </View>
                    <View style={{ flex: .085, zIndex: 999999, alignContent: "center", justifyContent: "center" }}>
                        <Header />
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            journalEntries.length ?
                                <FlashList
                                    // ListHeaderComponent={<Header />}
                                    // ListHeaderComponentStyle={{ zIndex: 9999 }}
                                    stickyHeaderIndices={[0]}
                                    data={journalEntries}
                                    extraData={refresh}
                                    renderItem={({ item, index }) => { return journalEntries.length && <JournalEntry event={(val) => deleteEntry(val)} item={item} index={index} /> }}
                                    estimatedItemSize={61}
                                />
                                :
                                <EmptyList />
                        }

                    </View>
                    <TouchableOpacity style={styleSelected.modalOpenButton}
                        onPress={() => {
                            // navigation.navigate("CreateEvent", { accounts: accounts, GetPermissionsCalendar: GetPermissionsCalendar })
                            setModalVisible(true)
                        }}>
                        <FontAwesome color={colors.BaseSlot1} size={40} name='plus' />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}