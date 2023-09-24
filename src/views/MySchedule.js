import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { Calendar, CalendarList, Agenda, WeekCalendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { FlashList } from '@shopify/flash-list'
import RBSheet from 'react-native-raw-bottom-sheet'
import * as ExpoCalendar from 'expo-calendar';
import ButtonPrimary from '../components/ButtonPrimary'
import uuid from 'react-native-uuid';
import { set } from 'react-native-reanimated'
import { useTranslation } from "react-i18next"


export default function MySchedule({ route, navigation }) {

    const { t, i18n } = useTranslation()

    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [selected, setSelected] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`);
    const [initialDate, setInitialDate] = useState(new Date())
    const [idsCalendars, setIdsCalendars] = useState([])
    const [accounts, setAccounts] = useState([])
    // const [eventsCalendar, setEventsCalendar] = useState([])
    const eventsCalendar = useRef([])
    const [markedDates, setMarkedDates] = useState({})
    const [eventsSelecteds, setEventsSelecteds] = useState([])

    const [calendarViews, setCalendarViews] = useState([{ label: t("schedule_monthly"), value: 1 }, { label: t("schedule_weekly"), value: 2 }])
    const [currentView, setCurrentView] = useState({ label: t("schedule_monthly"), value: 1 })

    const currentDelete = useRef(null)

    const today = new Date()

    LocaleConfig.locales["en"] = {
        monthNames: [
            t("january"),
            t("february"),
            t("march"),
            t("april"),
            t("may"),
            t("june"),
            t("july"),
            t("august"),
            t("september"),
            t("october"),
            t("november"),
            t("december")
        ],
        monthNamesShort: [
            t("january_short"),
            t("february_short"),
            t("march_short"),
            t("april_short"),
            t("may_short"),
            t("june_short"),
            t("july_short"),
            t("august_short"),
            t("september_short"),
            t("october_short"),
            t("november_short"),
            t("december_short")
        ],
        dayNames: [
            t("sunday"),
            t("monday"),
            t("tuesday"),
            t("wednesday"),
            t("thursday"),
            t("friday"),
            t("saturday")
        ],
        dayNamesShort: [
            t("sunday_short"),
            t("monday_short"),
            t("tuesday_short"),
            t("wednesday_short"),
            t("thursday_short"),
            t("friday_short"),
            t("saturday_short")
        ],
        today: t("today")
    }
    LocaleConfig.defaultLocale = 'en';

    const onDayPress = useCallback(day => {
        var filterByDay = eventsCalendar.current.filter(event => event.startDate.split('T')[0] === day.dateString)
        console.log("FILTER BY DAY", filterByDay)
        setEventsSelecteds(filterByDay)
        setSelected(day.dateString)
    })

    const options = [
        { id: 1, name: t("delete"), value: "delete", icon: "trash", iconType: "FontAwesome" },
    ]

    const optionPressed = (option) => {
        ExpoCalendar.deleteEventAsync(currentDelete.current.id).then((data) => {
            console.log("EVENT DELETED")
            GetPermissionsCalendar()
            refModalMenu.current.close()
        }).catch((error) => {
            console.log("Error delete event", error)
        })
    }

    const changeView = () => {
        if (currentView.value === 1) setCurrentView(calendarViews[1])
        else setCurrentView(calendarViews[0])
    }

    const refModalMenu = useRef()

    useEffect(() => {
        console.log('OPEN', MySchedule.name, 'SCREEN')
        //For test loading
        console.log("GET PERMISSION CALENDAR")
        GetPermissionsCalendar()
        return () => {
            console.log('SCREEN', MySchedule.name, 'CLOSE')
        }
    }, [])

    function createPromise(value) {
        return new Promise(res => {
            ExpoCalendar.getEventsAsync([value], new Date(2023, 1, 1), new Date(2027, 12, 31)).then((data) => {
                console.log("GETING EVENTS")
                eventsCalendar.current = [...eventsCalendar.current, ...data]
                // setEventsCalendar(eventsCalendar => [...eventsCalendar, ...data])
                res(data)
            }).catch((error) => {
                console.log("ERROR GETING EVENTS")
                console.log(error)
                res([])
            })
        })
    }

    function executeSequentially(array) {
        return createPromise(array.shift())
            .then(x => array.length == 0 ? x : executeSequentially(array));
    }

    function GetEventsCalendar() {
        ExpoCalendar.getCalendarsAsync(ExpoCalendar.EntityTypes.EVENT).then((calendars) => {
            console.log('Here are all your calendars:');
            console.log(JSON.stringify(calendars, undefined, 4));
            setAccounts(calendars)
            var idsCalendars = []
            // setIdsCalendars(calendars.map(calendar => calendar.id))
            calendars.forEach(calendar => {
                idsCalendars.push(calendar.id)
            })
            setIdsCalendars(idsCalendars)
            console.log("IDS CALENDARS", idsCalendars.length)
            executeSequentially(idsCalendars).then((data) => {
                console.log("FINISH")
                var markedDate = {}
                eventsCalendar.current.forEach(event => {
                    // Transform this date 2021-10-04T23:00:00.000Z to this 2021-10-04
                    var dateMarked = new Date(event.startDate).toISOString().split('T')[0]
                    var timeOfMeet = new Date(event.startDate).toISOString().split('T')[1].split('.')[0]
                    console.log("DATE MARKED", dateMarked)
                    console.log("TIME OF MEET", timeOfMeet)
                    var res = {
                        marked: true,
                        selected: true,
                        selectedColor: "#1CA3FC"
                    }
                    markedDate = Object.assign(markedDate, { [dateMarked]: res })
                })
                setMarkedDates(markedDate)
                setIsLoading(false)
            }).catch((error) => {
                console.log("Error execute sequentially", error)
            })
        }).catch((error) => {
            console.log("Error get calendars", error)
        })
    }

    function GetPermissionsCalendar() {
        eventsCalendar.current = []
        setEventsSelecteds([])
        setIsLoading(true)
        ExpoCalendar.requestCalendarPermissionsAsync().then((permission) => {
            console.log("STATUS CALENDAR", permission)
            if (permission.status === "granted") {
                console.log("GRANTED")
                ExpoCalendar.getCalendarsAsync(ExpoCalendar.EntityTypes.EVENT).then((calendars) => {
                    console.log('Here are all your calendars:');
                    console.log(JSON.stringify(calendars, undefined, 4));
                    setAccounts(calendars)
                    var idsCalendars = []
                    // setIdsCalendars(calendars.map(calendar => calendar.id))
                    calendars.forEach(calendar => {
                        idsCalendars.push(calendar.id)
                    })
                    setIdsCalendars(idsCalendars)
                    console.log("IDS CALENDARS", idsCalendars.length)
                    executeSequentially(idsCalendars).then((data) => {
                        console.log("FINISH")
                        var markedDate = {}
                        eventsCalendar.current.forEach(event => {
                            // Transform this date 2021-10-04T23:00:00.000Z to this 2021-10-04
                            var dateMarked = new Date(event.startDate).toISOString().split('T')[0]
                            var timeOfMeet = new Date(event.startDate).toISOString().split('T')[1].split('.')[0]
                            console.log("DATE MARKED", dateMarked)
                            console.log("TIME OF MEET", timeOfMeet)
                            var res = {
                                marked: true,
                                selected: true,
                                selectedColor: "#1CA3FC"
                            }
                            markedDate = Object.assign(markedDate, { [dateMarked]: res })
                        })
                        setMarkedDates(markedDate)
                        setIsLoading(false)
                    }).catch((error) => {
                        console.log("Error execute sequentially", error)
                    })
                }).catch((error) => {
                    console.log("Error get calendars", error)
                })
            } else {
                console.log("DENIED")
            }
        }).catch((error) => {
            console.log("Error in permission calendar", error)
        });
    }

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
    const renderArrowFunction = (direction) => {
        if (direction === "left") {
            return <Text>{t("schedule_previous")}</Text>
        }
        else return <Text>{t("schedule_next")}</Text>
    }

    const Header = ({ }) => (
        <>
            <View style={[styleSelected.backgroundPrimary, { flex: 1, height: 40, justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ fontWeight: 600, color: "#030849", fontSize: 20 }}>{t("navbar_schedule")}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", height: 50, }}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <TouchableOpacity onPress={changeView} style={{ borderWidth: .5, borderColor: "#A8A8A8", padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <Text>{currentView.label}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <CalendarProvider date={selected} >
                {currentView.value === 1 &&
                    <View style={{ flex: 1, height: 350 }}>
                        <Calendar style={{ opacity: 1 }}
                            onDayPress={(day) => onDayPress(day)}
                            current={selected}
                            key={selected}
                            markedDates={markedDates}
                            hideExtraDays={true}
                            enableSwipeMonths={true}
                            renderArrow={renderArrowFunction}
                            theme={{
                                monthTextColor: "#1CA3FC"
                            }}
                        />
                    </View>
                }
                {currentView.value === 2 &&
                    <View style={{ flex: 1 }}>
                        <WeekCalendar current={selected} onDayPress={(day) => onDayPress(day)} markedDates={markedDates} />
                    </View>
                }
            </CalendarProvider>
        </>
    )

    const Item = ({ item }) => (
        <View style={{ flex: 1, backgroundColor: "white", marginLeft: "10%", marginRight: "10%", marginTop: 50 }}>
            {/* <View style={{width:"10%"}}></View> */}
            <View style={{ flex: 1 }}>
                <View>
                    {/* <Text style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Friday - June 23</Text> */}
                </View>
                <View style={{ borderWidth: .5, borderRadius: 20, flex: 1, padding: 20, borderColor: "#A8A8A8" }}>
                    <View style={{ flexDirection: "row", width: "100%", }}>
                        <View style={{ alignItems: "baseline", width: "90%", justifyContent: "center" }}>
                            <Text style={{ color: "#1CA3FC", fontSize: 14, fontWeight: 600 }}>{item.title}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            currentDelete.current = item
                            refModalMenu.current.open()
                        }} style={{ position: "absolute", right: 0, justifyContent: "center", alignItems: "center", }}>
                            <MaterialCommunityIcons name='dots-horizontal' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 12 }}>{item.notes}</Text>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: "row" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: 600, fontSize: 13 }}>{new Date(item.startDate).toISOString().split('T')[0]}</Text>
                            <Text style={{ color: "#A8A8A8", fontSize: 13 }}>{item.recursion}</Text>
                        </View>
                        <View style={{ position: "absolute", right: 0 }}>
                            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
                                <FontAwesome style={{ height: "100%", }} name='clock-o' size={20} />
                                <Text style={{ fontWeight: 600, fontSize: 13 }}>&nbsp;&nbsp;{new Date(item.startDate).toISOString().split('T')[1].split('.')[0].substring(0, 5)} - {new Date(item.endDate).toISOString().split('T')[1].split('.')[0].substring(0, 5)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'white'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <FlashList
                    ListHeaderComponent={<Header />}
                    ListHeaderComponentStyle={{ zIndex: 9999, marginTop: 30 }}
                    data={eventsSelecteds}
                    estimatedItemSize={287}
                    renderItem={({ item, index }) => { return <Item item={item} /> }}
                />

                <RBSheet
                    height={130}
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
                    <View style={{ flex: 1, padding: 25, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
                        {options.map(list => (
                            <View key={uuid.v4.toString()} style={{ flex: 1 }}>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#D00", marginTop: 15, borderRadius: 10, height: 50 }}
                                    key={list.id}
                                    onPress={() => optionPressed(list)}
                                >
                                    <View style={{ flex: .5, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                        {list.iconType === "FontAwesome" && <FontAwesome style={{ fontSize: 26, color: "white" }} name={list.icon} />}
                                        {list.iconType === "MaterialCommunityIcons" && <MaterialCommunityIcons style={{ fontSize: 26, color: "white" }} name={list.icon} />}
                                    </View>
                                    <View style={{ flex: 2, height: "100%", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={[{ fontSize: 16, color: "white" }, list.iconType === "FontAwesome" && { marginLeft: 0 }]}>{list.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </RBSheet>

                <TouchableOpacity style={styleSelected.modalOpenButton}
                    onPress={() => {
                        navigation.navigate("CreateEvent", { accounts: accounts, GetPermissionsCalendar: GetPermissionsCalendar })
                    }}>
                    <FontAwesome color={colors.BaseSlot1} size={40} name='plus' />
                </TouchableOpacity>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}