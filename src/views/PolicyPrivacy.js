import React, { useEffect, useRef, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, Appearance, useColorScheme, Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen';
import Loader from '../components/Loader'
import { ScrollView } from 'react-native-gesture-handler'

export default function PolicyPrivacy({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    useEffect(() => {
        console.log('OPEN', PolicyPrivacy.name, 'SCREEN')
        return () => {
            console.log('SCREEN', PolicyPrivacy.name, 'CLOSE')
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
                <ScrollView style={[styleSelected.backgroundPrimary, { flex: 1, margin: 10 }]}>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>Thank you for joining the SMARTCaring community.
                        The purpose of this informative document is to provide you with all the necessary information about how your personal data will be processed when you use SMARTCaring.
                        The processing of your personal data will be done in compliance with the General Data Protection Regulation (GDPR).  </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>What data are collected? </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>SMARTCaring App will gather and process some of your personal data, including your name, age, birth date, gender, contact information (address, email and phone number) and role in caregiving environment (caregiver, patient or formal support staff).  </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>How your data are collected? </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>The personal data you provide is collected when you register online on SMARTCaring App. </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>How your data are going to be used? </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>The personal data collected will be related to a code number (token) and will be anonymized and will be used only for account management. Only the personal information, besides first name, that you expressly authorize, will be shown on the platform (in the Community and Chat Room).
                        The personal data related to your age, gender and location can also be used for statistical purposes, regarding tools performance and/or research purposes, always anonymized.
                        Your data will never be shared with other external entities. </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>How your data will be stored?  </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>The personal data collected will be stored in CloudDB, where all data exchange is encrypted, and the storage of sensitive data is also encrypted (256 bits).
                        The personal data will be stored until you expressly close and delete your account.
                    </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>What are your data protection rights? </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>SMARTCaring wants to make sure that you are fully aware of all your data protection rights, that are the following:
                        Right to Access: You have the right to request SMARTCaring for copies of your personal data. A small fee can be charged for this service.
                        Right to Rectification: You have the right to request SMARTCaring to correct any information you believe is inaccurate. You also have the right to request SMARTCaring to complete information you believe is incomplete.
                        Right to Erasure: You have the right to request SMARTCaring to erase your personal data, under certain conditions.
                        Right to Restrict Processing: You have the right to request SMARTCaring to restrict the processing of your personal data, under certain conditions.
                        Right to Object Processing: You have the right to object to SMARTCaring processing of your personal data, under certain conditions.
                        Right to Data Portability: You have the right to request SMARTCaring to transfer the collected data to another organization or directly to you, under certain conditions.
                        If you make a request SMARTCaring will answer you within one month. If you would like to exercise any of these rights, please contact SMARTCaring at the email: info@smartcaring.pt
                    </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>Privacy policies of other websites or Apps  </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>SMARTCaring App contains links to other websites and Apps. Our privacy policy applies only to SMARTCaring App, so, if you click on a link to another website or App, you should read their privacy policy.
                    </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>Changes to our privacy policy  </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>SMARTCaring keeps its privacy under regular review and places any updates on the App. This privacy policy was last updated on 1st of June 2023.
                    </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>How to contact SMARTCaring </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>If you have any questions about SMARTCaring privacy policy, what personal data is hold by SMARTCaring, or you would like to exercise one of your data protection rights, please do not hesitate in contact SMARTCaring at the mail: info@smartcaring.pt
                    </Text>
                    <View style={{ height: 25 }} />
                    <Text style={{ fontWeight: 800, fontSize: 16 }}>How to contact the appropriate authority </Text>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>Should you wish to report a compliant or if you feel that SMARTCaring has not addressed your concern in a satisfactory manner, you may contact the CNPD – Portuguese National Data Protection Commission at CNPD.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}