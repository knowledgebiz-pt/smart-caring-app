import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { Calendar, CalendarList, Agenda, WeekCalendar, CalendarProvider } from 'react-native-calendars';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { FlashList } from '@shopify/flash-list'
import RBSheet from 'react-native-raw-bottom-sheet'
import * as ExpoCalendar from 'expo-calendar';
import ButtonPrimary from '../components/ButtonPrimary'

export default function MySchedule({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    const [selected, setSelected] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`);
    const [initialDate, setInitialDate] = useState(new Date())
    const [idsCalendars, setIdsCalendars] = useState([])
    const [eventsCalendar, setEventsCalendar] = useState([])
    const [markedDates, setMarkedDates] = useState({})
    const [eventsSelecteds, setEventsSelecteds] = useState([])

    const [calendarViews, setCalendarViews] = useState([{ label: "Monthly", value: 1 }, { label: "Weekly", value: 2 }])
    const [currentView, setCurrentView] = useState({ label: "Monthly", value: 1 })

    const [mockData, setMockData] = useState([
        {
            title: "Doctor appointment",
            description: "ifodsjghiovxkjvsd saofjvsindjagnew fdsagqwefwe",
            date: "23/07/2023",
            startHour: "14h30",
            endHour: "15h00",
            recursion: "Occur every Friday",
            testingColor: "beige"
        },
        {
            title: "Doctor appointment 2",
            description: "ifodsjghiovxkjvsd saofjvsindjagnew fdsagqwefwe 2",
            date: "23/07/2023",
            startHour: "14h40",
            endHour: "15h10",
            recursion: "Occur every Friday 2",
            testingColor: "orange"
        },
    ])

    const today = new Date()
    const todayFormatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`

    const onDayPress = useCallback(day => {
        var filterByDay = eventsCalendar.filter(event => event.startDate.split('T')[0] === day.dateString)
        console.log("FILTER BY DAY", filterByDay)
        setEventsSelecteds(filterByDay)
        setSelected(day.dateString)
    })

    const options = [
        { id: 1, name: "Delete", value: "delete", icon: "trash", iconType: "FontAwesome" },
    ]

    const optionPressed = (option) => {
        if (option.value === "delete") {
            console.log("Delete")
        }
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
                setEventsCalendar(eventsCalendar => [...eventsCalendar, ...data])
                res(data)
            })
        })
    }

    function executeSequentially(array) {
        return createPromise(array.shift())
            .then(x => array.length == 0 ? x : executeSequentially(array));
    }

    async function GetPermissionsCalendar() {
        const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
        console.log("STATUS CALENDAR", status)
        if (status === 'granted') {
            const calendars = await ExpoCalendar.getCalendarsAsync(ExpoCalendar.EntityTypes.EVENT);
            console.log('Here are all your calendars:');
            console.log(JSON.stringify(calendars, undefined, 4));
            setIdsCalendars(calendars.map(calendar => calendar.id))
            executeSequentially(idsCalendars).then((data) => {
                console.log("FINISH")
                var markedDate = {}
                eventsCalendar.forEach(event => {
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
                    setIsLoading(false)
                })
                setMarkedDates(markedDate)
            })
        }
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
            return <Text>Previous</Text>
        }
        else return <Text>Next</Text>
    }

    const Header = ({ }) => (
        <>
            <View style={[styleSelected.backgroundPrimary, { flex: 1, height: 40, justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ fontWeight: 600, color: "#030849", fontSize: 20 }}>My Schedule</Text>
            </View>

            <View style={{ flex: 1, height: 50, justifyContent: "center", alignItems: "center" }}>
                <View style={{ borderWidth: 1, width: "90%", flexDirection: "row", borderRadius: 30, padding: 3 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                        <FontAwesome size={15} name='search' />
                    </View>
                    <TextInput style={{ marginLeft: 10, height: 30}} placeholder='Search'></TextInput>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row", height: 50, }}>
                <View style={{ width: "5%" }}></View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity style={{ borderWidth: 1, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <Text>Export Schedule</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                    <TouchableOpacity onPress={changeView} style={{ borderWidth: 1, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 30, width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <Text>{currentView.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "5%" }}></View>

            </View>
            <CalendarProvider date={selected}>
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
                        <TouchableOpacity onPress={() => { refModalMenu.current.open() }} style={{ position: "absolute", right: 0, justifyContent: "center", alignItems: "center", }}>
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
                                <Text style={{ fontWeight: 600, fontSize: 13 }}>&nbsp;&nbsp;{new Date(item.startDate).toISOString().split('T')[1].split('.')[0]} - {new Date(item.endDate).toISOString().split('T')[1].split('.')[0]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* <View style={{width:"10%"}}></View> */}

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
                        {/* <View style={{flexDirection: "row"}}>
                            <Text style={{color:"white", fontSize:14}}>{user.name}</Text>
                            <Image style={[{width: 35, height: 20, marginLeft: 10, tintColor:"white"}, ]} source={userType}/>
                        </View> */}
                        {options.map(list => (
                            <View style={{ flex: 1 }}>
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

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}