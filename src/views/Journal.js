import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import Loader from '../components/Loader'
import { FlashList } from '@shopify/flash-list'
import { FontAwesome } from '@expo/vector-icons'
import JournalEntryCreationPopup from '../components/JournalEntryCreationPopup'
import JournalEntry from '../components/JournalEntry'
import SearchInput from '../components/SearchInput'
import DropDownPicker from 'react-native-dropdown-picker'
import { DiaryService } from 'smart-caring-client/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useTranslation } from "react-i18next"


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

    const {t, i18n} = useTranslation()

    const [originalData, setOriginalData] = useState([...journalEntries])

    const [searchText, setSearchText] = useState(null)

    const [openEntry, setOpenEntry] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [sortItems, setSortItems] = useState([
        { label: t('recent'), value: 'recent' },
        { label: t('old'), value: 'old' }
    ])

    const [filterItems, setFilterItems] = useState([
        { label: "All", value: "All" },
        { label: "Favorites", value: "Favorites" },
        { label: "Liked", value: "Liked" },
        { label: 'Caregiver', value: 'Caregiver' },
        { label: 'Patient', value: 'Patient' },
        { label: 'Health Professional', value: 'Health Professional' },
        { label: 'Unlabeled', value: 'Unlabeled' },
    ])

    const [sortSelectOpen, setSortSelectOpen] = useState(false)
    const [filterSelectOpen, setFilterSelectOpen] = useState(false)
    const [sortSelectValue, setSortSelectValue] = useState({ label: t("recent"), value: 'recent' })
    const [filterSelectValue, setFilterSelectValue] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem("@token").then(res => {
            console.log(res)
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
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
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
        if (!val || val.description.length < 50) {
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
                    visibility:false
                }
                console.log(formattedData)
                console.log(formattedData.tags.split(";;;"))
                DiaryService.createDiary(formattedData).then(res => {
                    // let newData = [...journalEntries]; newData.push(val); setJournalEntries(newData) 
                    showToast(t("journal_toast_created_entry"), "success")
                    getJournalEntries()
                })
    
            })
        }
    }

    const getJournalEntries = () => {
        AsyncStorage.getItem("@token").then(res => {
            console.log(res)
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

    const refreshList = () => {
        setRefresh(!refresh)
    }

    const deleteEntry = (val) => {
        console.log("val: ", val)
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

    // const handleEntryModalOpen = (item) => {
    //     // setOpenEntry(true)
    //     console.log(openEntry)
    //     return (<JournalEntryPopup item={item} shouldOpen={openEntry} openEntry={setOpenEntry(true)} closeEntry={setOpenEntry(false)}/>)
    // }

    // const SearchInput = ({}) => (
    //     <TextInput style={{marginLeft:10, width:"100%" }} value={searchText} placeholder='Search' onChangeText={(val) => searchFunction(val)} />
    // )

    const Header = ({ }) => (
        <>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "5%" }}></View>
                <View style={{ flex: 1, flexDirection: "row" }}>

                    {/* <View style={{ flex: .5, justifyContent: "center", }}>
                        <DropDownPicker listMode="SCROLLVIEW" key={"key1"} style={{ borderWidth: .5, borderColor: "#A8A8A8", color: "red", padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center", minHeight: 30 }} placeholder={"Sort by: " + sortSelectValue.label} onSelectItem={(val) => { setSortSelectValue(val); setSortSelectOpen(false); sortPosts(val) }} onPress={() => { setSortSelectOpen(!sortSelectOpen); setFilterSelectOpen(false) }} open={sortSelectOpen} items={sortItems}
                            ArrowDownIconComponent={() => {
                                return <FontAwesome name="chevron-down" color={"#A8A8A8"} />
                            }}
                            ArrowUpIconComponent={() => {
                                return <FontAwesome name="chevron-up" color={"#A8A8A8"} />
                            }}
                        />

                    </View>
                    <View style={{ flex: .5, flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <View style={{ flex: .3, }} />
                        <View style={{ flex: .7, justifyContent: "flex-end", paddingRight: 0, }}>
                            <DropDownPicker listMode="SCROLLVIEW" key={"key2"} maxHeight={200} dropDownContainerStyle={[{ maxHeight: 300 }]} labelStyle={{ color: "red" }} style={{ borderWidth: .5, borderColor: "#A8A8A8", padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, alignItems: "center", justifyContent: "center", minHeight: 30, alignSelf: "flex-end" }} placeholder={"Filter"} onSelectItem={(val) => { setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val) }} onPress={() => { setFilterSelectOpen(!filterSelectOpen); setSortSelectOpen(false) }} open={filterSelectOpen} items={filterItems}
                                ArrowDownIconComponent={() => {
                                    return <FontAwesome name="chevron-down" color={"#A8A8A8"} />
                                }}
                                ArrowUpIconComponent={() => {
                                    return <FontAwesome name="chevron-up" color={"#A8A8A8"} />
                                }}
                            />

                        </View>

                    </View> */}

                    <View style={{ flex: 1, justifyContent: "center", }}>
                        <DropDownPicker listMode="SCROLLVIEW" key={"key1"} dropDownContainerStyle={{borderWidth: .5,
                                                borderColor:"#A8A8A8",}} style={{ borderWidth: .5, borderColor: "#A8A8A8", color: "red", padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30,  alignItems: "center", justifyContent: "center", minHeight: 30 }} placeholder={t("sort_by") + ": " + sortSelectValue.label} onSelectItem={(val) => { setSortSelectOpen(false); sortPosts(val) }} onPress={() => { setSortSelectOpen(!sortSelectOpen) }} open={sortSelectOpen} items={sortItems}
                            ArrowDownIconComponent={() => {
                                return <FontAwesome name="chevron-down" color={"#A8A8A8"} />
                            }}
                            ArrowUpIconComponent={() => {
                                return <FontAwesome name="chevron-up" color={"#A8A8A8"} />
                            }}
                        />

                    </View>

                    {/* <SortAndFilterSelects sortItems={sortItems} filterItems={filterItems} 
                        onSelectSort={(val) => {setSortSelectValue(val); setSortSelectOpen(false); sortPosts(val)}} 
                        sortValue={sortSelectValue} 
                        onSelectFilter={(val) => {setFilterSelectValue(val); setFilterSelectOpen(false); filterPosts(val)}} 
                        filterValue={filterSelectValue}  
                    /> */}
                </View>
                {/* <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity style={{ borderWidth: 1, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <Text>Sort by: Recent</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                    <TouchableOpacity style={{ borderWidth: 1, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <Text>Filters</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{ width: "5%" }}></View>

            </View>
        </>
    )

    const Item = ({ item, index }) => (
        <>
            <View style={{ flex: 1, marginLeft: "5%", marginRight: "5%" }}>
                {index === 0 && <View style={{ borderTopWidth: .5 }}></View>}
                <TouchableOpacity onPress={() => { console.log("??"); handleEntryModalOpen(item) }} style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 20 }}>
                    <View style={{ flex: .40, flexDirection: "column" }}>
                        <Text style={{ fontWeight: 600, justifyContent: "center", alignItems: "center", }}>{item.title}</Text>
                        <Text>{item.date}</Text>
                    </View>
                    <View style={{ flex: .20 }}></View>
                    <View style={{ flex: .40, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ borderWidth: 1, borderRadius: 30, borderColor: item.categoryColor, padding: 10, paddingTop: 5, paddingBottom: 5 }}>
                            <Text style={{ color: item.categoryColor }}>{item.category}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ borderTopWidth: .5, }}></View>
            </View>
        </>
    )

    const EmptyList = () => (
        <>
            <View style={{ flex: 1, marginLeft: "10%", marginRight: "10%", alignItems:"center" }}>
                {originalData.length === 0 && <Text style={{fontWeight:600, marginTop:50}}>{t("journal_begin_message")}</Text>}
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
                    <JournalEntryCreationPopup event={(val) => { createEntry(val);}} />
                </View>

                <View style={[styleSelected.backgroundPrimary, { flex: 1, }]}>
                    <View style={[styleSelected.backgroundPrimary, { flex:.065, justifyContent: "center", alignItems: "center",}]}>
                        <Text style={{ fontWeight: 600, color: "#030849", fontSize: 20 }}>{t("navbar_journal")}</Text>
                    </View>

                    <View style={{ flex:.085, justifyContent: "center", alignItems: "center", }}>
                        <View style={{ borderWidth: .5, borderColor: "#A8A8A8", width: "90%", flexDirection: "row", borderRadius: 30, padding: 3 }}>
                            <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                <FontAwesome size={15} color={"#A8A8A8"} name='search' />
                            </View>
                            <SearchInput value={searchText} placeholder={t("search")} onChangeText={(val) => searchFunction(val)} />
                        </View>
                    </View>
                    <View style={{flex:.085,zIndex:999999, alignContent:"center", justifyContent:"center"}}>
                        <Header/>

                    </View>
                    <View style={{flex:1}}>
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
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}