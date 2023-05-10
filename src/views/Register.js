import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import DropDownPicker from 'react-native-dropdown-picker'
import CheckBox from 'expo-checkbox'
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { RegisterUser } from '../services/RegisterService'

export default function Register({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    const colors = require('../../style/Colors.json')

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Patient', value: '1'},
        {label: 'Caregiver', value: '2'},
        {label: 'Healthcare Professional', value: '3'}
    ]);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {
        console.log('OPEN', Register.name, 'SCREEN')
        //For test loading
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return () => {
            console.log('SCREEN', Register.name, 'CLOSE')
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
        <SafeAreaView style={[styleSelected.backgroundPrimary, { flex: 1 }]} onLayout={onLayoutRootView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <KeyboardAvoidingView
                style={{ flex: 1}}
                enabled={true}
                behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'android' ? -150 : -150}
            >
                <View style={styleSelected.container}>
                    <Image style={styleSelected.image} source={require("../../assets/images/logo.png")} />
                    <StatusBar style="auto" />
                    <View style={styleSelected.inputView}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Name"
                            placeholderTextColor="#ccc"
                            onChangeText={(name) => setName(name)}
                        />
                    </View>
                    <View style={styleSelected.inputView}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Username"
                            placeholderTextColor="#ccc"
                            onChangeText={(username) => setUsername(username)}
                        />
                    </View>
                    <View style={styleSelected.inputView}>
                        {/* <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={(email) => setEmail(email)}
                        /> */}
                        <DropDownPicker style={styleSelected.DropDownPicker}
                        placeholder='Role'
                        placeholderStyle={{color:'#ccc'}}
                            textStyle={{color: '#fff', marginLeft:20}}
                            dropDownContainerStyle={styleSelected.dropDownContainer}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>
                    <View style={styleSelected.checkboxView}>
                        <CheckBox disabled={false} value={toggleCheckBox}
                        onValueChange={(newVal) => setToggleCheckBox(newVal)}/><Text onPress={() => setToggleCheckBox(!toggleCheckBox)}> I wish to display my role on my profile.</Text>
                    </View>
                    <View style={styleSelected.inputViewBelowDropdown}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styleSelected.inputViewBelowDropdown}>
                        <TextInput
                            style={styleSelected.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <View style={{marginTop: -20,marginBottom:20}}>
                    <BarPasswordStrengthDisplay width={300}
                            password={password}
                        />
                    </View>
                    <Text style={styleSelected.option_buttons}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[styleSelected.option_buttons, {color: colors.Base_Slot_4}]}>Click here to login instead</Text>
                    </TouchableOpacity>
                    <Pressable onPressOut={() => RegisterUser(name, username, value, toggleCheckBox, email, password)} style={({ pressed }) => pressed ? styleSelected.pressedLoginBtn : styleSelected.loginBtn}>
                        <Text style={styleSelected.loginText}>REGISTER</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}