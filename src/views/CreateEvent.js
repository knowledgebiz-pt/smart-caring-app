import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import InputDefault from '../components/InputDefault'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonPrimary from '../components/ButtonPrimary'
import * as Calendar from 'expo-calendar';
import { and, set } from 'react-native-reanimated'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useTranslation } from "react-i18next"


export default function CreateEvent({ route, navigation }) {

    const { t, i18n } = useTranslation()

    const [isLoading, setIsLoading] = useState(true)
    const [nameEvent, setNameEvent] = useState("")
    const [descriptionEvent, setDescriptionEvent] = useState("")
    const [dateStartEvent, setDateStartEvent] = useState(new Date())
    const [dateEndEvent, setDateEndEvent] = useState(new Date())
    const [timeStartEvent, setTimeStartEvent] = useState("")
    const [timeEndEvent, setTimeEndEvent] = useState("")
    const [isAllDayEvent, setIsAllDayEvent] = useState(false)
    const [isAlarmEvent, setIsAlarmEvent] = useState(false)
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [filterItems, setFilterItems] = useState([])
    const [accoutSelected, setAccoutSelected] = useState(null)
    const [ShowDataPicker, setShowDataPicker] = useState(false)
    const [showTimePickerStart, setShowTimePickerStart] = useState(false)
    const [ShowDataPickerEnd, setShowDataPickerEnd] = useState(false)
    const [showTimePickerEnd, setShowTimePickerEnd] = useState(false)

    var dateStartAndroid = new Date(dateStartEvent)

    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', CreateEvent.name, 'SCREEN')
        console.log(route.params.accounts)
        route.params.accounts.forEach((element, idx) => {
            console.log("title", element.title)
            console.log("id", element.id)
            setFilterItems(filterItems => [...filterItems, { label: element.title, value: element.id }])
        });
        //For test loading
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
        return () => {
            console.log('SCREEN', CreateEvent.name, 'CLOSE')
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

    return (
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 10 }}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={[styleSelected.backgroundPrimary, { flex: 1, marginTop: 20 }]}>
                    <View style={{ justifyContent: "flex-start", alignItems: "center", display: "flex", alignContent: "center", height: isOpenDropdown ? 280 : 80 }}>
                        <Text>{t("schedule_select_calendar")}</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            key={"key1"}
                            style={{ maxHeight: 40, height: 40, borderWidth: .5, borderColor: colors.BaseSlot5, color: "red", padding: 5, paddingLeft: 15, paddingRight: 15, width: "100%", alignItems: "center", justifyContent: "center", minHeight: 30, alignSelf: "center" }}
                            containerStyle={{ width: "85%", marginTop: 10, backgroundColor: "white", alignSelf: "center", }}
                            selectedItemContainerStyle={{ height: 40, alignItems: "center", justifyContent: "center", minHeight: 30, backgroundColor: "red", alignSelf: "center" }}
                            dropDownContainerStyle={{borderWidth:.5, borderColor:colors.BaseSlot5}}
                            onPress={() => {
                                console.log("onPress")
                                setIsOpenDropdown(!isOpenDropdown)
                            }}
                            onSelectItem={(item) => {
                                console.log("onSelectItem")
                                console.log(item)
                                setAccoutSelected(item)
                                setIsOpenDropdown(false)
                            }}
                            placeholder={accoutSelected ? accoutSelected.label : t("schedule_select_calendar")}
                            items={filterItems}
                            open={isOpenDropdown}
                        // ArrowDownIconComponent={() => {
                        //     return <FontAwesome name="chevron-down" color={colors.BaseSlot5} />
                        // }}
                        // ArrowUpIconComponent={() => {
                        //     return <FontAwesome name="chevron-up" color={colors.BaseSlot5} />
                        // }}
                        />
                    </View>
                    <TextInput
                        multiline={false}
                        placeholder={t('title')}
                        placeholderTextColor={colors.BaseSlot3}
                        onChangeText={(text) => setNameEvent(text)}
                        value={nameEvent}
                        style={{
                            backgroundColor: colors.BaseSlot1,
                            minHeight: 40,
                            borderColor: colors.BaseSlot5,
                            borderWidth: .5,
                            margin: 5,
                            borderRadius: 10,
                            padding: 10,
                            width: "85%",
                            alignSelf: "center"
                        }} />

                    <TextInput
                        multiline={true}
                        placeholder={t('description')}
                        placeholderTextColor={colors.BaseSlot3}
                        onChangeText={(text) => setDescriptionEvent(text)}
                        value={descriptionEvent}
                        style={{
                            backgroundColor: colors.BaseSlot1,
                            minHeight: 40,
                            borderColor: colors.BaseSlot5,
                            borderWidth: .5,
                            margin: 5,
                            borderRadius: 10,
                            padding: 10,
                            width: "85%",
                            alignSelf: "center"
                        }} />
                    <View style={{ height: 120, justifyContent: "space-evenly", alignItems: "center" }}>
                        <Text>{t("schedule_event_date_time_start")}</Text>
                        {
                            Platform.OS == "ios" && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    style={{ alignSelf: "center" }}
                                    value={dateStartEvent}
                                    mode={"datetime"}
                                    is24Hour={false}
                                    focusable={false}
                                    timeZoneOffsetInMinutes={0}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || dateStartEvent;
                                        console.log("currentDateStart", new Date(currentDate))
                                        setDateStartEvent(currentDate);
                                    }}
                                />
                            )
                        }
                        {
                            Platform.OS == "android" && (
                                <View
                                    style={{ width: "100%" }}
                                    onTouchEnd={() => {
                                        console.log("onTouchEnd")
                                        setShowDataPicker(!ShowDataPicker)
                                    }}>
                                    <TextInput
                                        multiline={true}
                                        placeholder={'Start Date'}
                                        placeholderTextColor={colors.BaseSlot3}
                                        onChangeText={(text) => setDescriptionEvent(text)}
                                        editable={false}
                                        value={dateStartEvent.toLocaleDateString() + " " + dateStartEvent.toLocaleTimeString()}
                                        style={{
                                            backgroundColor: colors.BaseSlot1,
                                            minHeight: 40,
                                            borderColor: colors.BaseSlot5,
                                            borderWidth: .5,
                                            margin: 5,
                                            borderRadius: 10,
                                            padding: 10,
                                            width: "85%",
                                            alignSelf: "center"
                                        }} />
                                    {
                                        ShowDataPicker && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                style={{ alignSelf: "center" }}
                                                value={dateStartEvent}
                                                mode={"datetime"}
                                                is24Hour={false}
                                                timeZoneOffsetInMinutes={0}
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    console.log("event", event)
                                                    console.log("selectedDate", selectedDate)
                                                    if (event.type == "dismissed")
                                                        setShowDataPicker(false)
                                                    else {
                                                        setShowDataPicker(false)
                                                        setShowTimePickerStart(true)
                                                        console.log("dateStartAndroid", dateStartAndroid)
                                                        const currentDate = selectedDate || dateStartEvent;
                                                        console.log("currentDateStart", event)
                                                        setDateStartEvent(currentDate);
                                                        androidDate = currentDate
                                                    }
                                                }}
                                            />
                                        )
                                    }

                                    {
                                        showTimePickerStart && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                style={{ alignSelf: "center" }}
                                                value={dateStartEvent}
                                                mode={"time"}
                                                is24Hour={false}
                                                timeZoneOffsetInMinutes={0}
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    if (event.type == "dismissed")
                                                        setShowTimePickerStart(false)
                                                    else {
                                                        setShowTimePickerStart(false)
                                                        console.log("dataToSave", androidDate)
                                                        console.log("selectedDate", selectedDate)
                                                        var dateStartToSend = new Date(
                                                            androidDate.getFullYear(),
                                                            androidDate.getMonth(),
                                                            androidDate.getDate(),
                                                            selectedDate.getHours(),
                                                            selectedDate.getMinutes(),
                                                            selectedDate.getSeconds(),
                                                        )
                                                        console.log("dateStartToSend", dateStartToSend)
                                                        setDateStartEvent(dateStartToSend);
                                                    }
                                                }}
                                            />
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>

                    <View style={{ height: 120, justifyContent: "space-evenly", alignItems: "center" }}>
                        <Text>{t("schedule_event_date_time_end")}</Text>
                        {
                            Platform.OS == "ios" && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    style={{ alignSelf: "center" }}
                                    value={dateEndEvent}
                                    mode={"datetime"}
                                    is24Hour={false}
                                    focusable={false}
                                    timeZoneOffsetInMinutes={0}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || dateEndEvent;
                                        console.log("currentDateStart", new Date(currentDate))
                                        setDateEndEvent(currentDate);
                                    }}
                                />
                            )
                        }
                        {
                            Platform.OS == "android" && (
                                <View
                                    style={{ width: "100%" }}
                                    onTouchEnd={() => {
                                        console.log("onTouchEnd")
                                        setShowDataPickerEnd(!ShowDataPickerEnd)
                                    }}>
                                    <TextInput
                                        multiline={true}
                                        placeholder={'Start Date'}
                                        placeholderTextColor={colors.BaseSlot3}
                                        onChangeText={(text) => setDescriptionEvent(text)}
                                        editable={false}
                                        value={dateEndEvent.toLocaleDateString() + " " + dateEndEvent.toLocaleTimeString()}
                                        style={{
                                            backgroundColor: colors.BaseSlot1,
                                            minHeight: 40,
                                            borderColor: colors.BaseSlot5,
                                            borderWidth: 1,
                                            margin: 5,
                                            borderRadius: 10,
                                            padding: 10,
                                            width: "85%",
                                            alignSelf: "center"
                                        }} />
                                    {
                                        ShowDataPickerEnd && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                style={{ alignSelf: "center" }}
                                                value={dateEndEvent}
                                                mode={"datetime"}
                                                is24Hour={false}
                                                timeZoneOffsetInMinutes={0}
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    console.log("event", event)
                                                    console.log("selectedDate", selectedDate)
                                                    if (event.type == "dismissed")
                                                        setShowDataPickerEnd(false)
                                                    else {
                                                        setShowDataPickerEnd(false)
                                                        setShowTimePickerEnd(true)
                                                        console.log("dateStartAndroid", dateStartAndroid)
                                                        const currentDate = selectedDate || dateEndEvent;
                                                        console.log("currentDateStart", event)
                                                        setDateEndEvent(currentDate);
                                                        androidDate = currentDate
                                                    }
                                                }}
                                            />
                                        )
                                    }

                                    {
                                        showTimePickerEnd && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                style={{ alignSelf: "center" }}
                                                value={dateEndEvent}
                                                mode={"time"}
                                                is24Hour={false}
                                                timeZoneOffsetInMinutes={0}
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    if (event.type == "dismissed")
                                                        setShowTimePickerEnd(false)
                                                    else {
                                                        setShowTimePickerEnd(false)
                                                        console.log("dataToSave", androidDate)
                                                        console.log("selectedDate", selectedDate)
                                                        var dateStartToSend = new Date(
                                                            androidDate.getFullYear(),
                                                            androidDate.getMonth(),
                                                            androidDate.getDate(),
                                                            selectedDate.getHours(),
                                                            selectedDate.getMinutes(),
                                                            selectedDate.getSeconds(),
                                                        )
                                                        console.log("dateStartToSend", dateStartToSend)
                                                        setDateEndEvent(dateStartToSend);
                                                    }
                                                }}
                                            />
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>

                    {/* <View style={{ height: 120, justifyContent: "space-evenly", alignItems: "center" }}>
                        <Text>Select date and time to end</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            style={{ alignSelf: "center" }}
                            value={dateEndEvent}
                            mode={"datetime"}
                            is24Hour={false}
                            timeZoneOffsetInMinutes={0}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || dateStartEvent;
                                console.log("date", selectedDate)
                                console.log("currentDateEnd", new Date(currentDate))
                                setDateEndEvent(currentDate);
                            }}
                        />
                    </View> */}
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <ButtonPrimary title={t("submit")} event={() => {
                            console.log("accoutSelected", accoutSelected.value)
                            console.log({
                                title: nameEvent,
                                startDate: new Date(dateStartEvent),
                                endDate: new Date(dateEndEvent),
                                location: 'Online',
                                alarms: [{ relativeOffset: - 900, method: Calendar.AlarmMethod.ALERT }],
                                notes: descriptionEvent
                            })
                            Calendar.createEventAsync(accoutSelected.value, {
                                title: nameEvent,
                                startDate: new Date(dateStartEvent),
                                endDate: new Date(dateEndEvent),
                                location: 'Online',
                                alarms: [{ relativeOffset: - 15, method: Calendar.AlarmMethod.ALERT }],
                                notes: descriptionEvent
                            }).then((event) => {
                                console.log('success', event);
                                route.params.GetPermissionsCalendar()
                                navigation.goBack()
                            }).catch((error) => {
                                console.log('error', error);
                                Toast.show({
                                    type: 'error',
                                    position: 'bottom',
                                    text1: t("schedule_event_error_text1"),
                                    text2: t("schedule_event_error_text2"),
                                });
                            });
                        }} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}