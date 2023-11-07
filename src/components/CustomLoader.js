import React from "react";
import { View, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import LottieView from 'lottie-react-native';

export default function CustomLoader({
    width=200,
    height=200,
    customStyle
}) {
    const colors = require("../../style/Colors.json")
    let colorScheme = useColorScheme()
    const styleSelected = colorScheme == 'light' ? style : styleDark
    return (
        <View style={[styleSelected.backgroundLoader, customStyle]}>
            <LottieView
                autoPlay
                style={{
                    width: width,
                    height: height,
                }}
                source={require('../../assets/json/loading-heart.json')}
            />
        </View>
    )
}