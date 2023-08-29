import React, { useEffect, useState } from 'react'
import { useColorScheme, View, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';

/***
 * @param img: string - URI of the user's profile image
 */

export default function HeaderLogoAndProfileImage({ img }) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(img)
    }, [])
    return (
        <View style={{ flexDirection: "row" }}>
            <Image source={require("../../assets/images/logo.png")} style={styleSelected.logoLeftSide} resizeMode='contain' />
            <Image
                style={[styleSelected.avatar, styleSelected.avatarRightSide, { backgroundColor: "green" }]}
                source={{ uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }}
            />
            {/* Icon style is very specific for this case and will likely not work in different situations. */}
            <View style={{ height: 30, width: 30, backgroundColor: colors.BaseSlot1, position: "absolute", bottom: 10, right: 50, borderRadius: 50, overflow: "hidden", justifyContent: "center", alignItems: "center", alignContent: "center", borderWidth: 2, borderColor: colors.BaseSlot6 }}>
                <MaterialCommunityIcons
                    name={'menu'}
                    size={20}
                    color={"#030849"}
                    style={[{ alignSelf: "center" }]}
                />
            </View>

        </View>
    )
}