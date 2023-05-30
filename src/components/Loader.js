import React from "react";
import { Text, View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import LottieView from 'lottie-react-native';

export default function Loader() {
    const colors = require("../../style/Colors.json")
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    return (
        <View style={styleSelected.backgroundLoader}>
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                }}
                source={require('../../assets/json/loading-heart.json')}
            />
        </View>
    )
}