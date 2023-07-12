import React, { useEffect, useState } from 'react'
import { useColorScheme, View, Image } from 'react-native'
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import { MaterialCommunityIcons } from '@expo/vector-icons';

/***
 * @param img: string - URI of the user's profile image
 */

export default function HeaderLogoAndProfileImage({img}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(img)
    }, [])
    return (
        <View style={{flexDirection: "row"}}>
            <Image source={require("../../assets/images/logo.png")} style={styleSelected.logoLeftSide} resizeMode='contain' />
            <Image
                style={[styleSelected.avatar, styleSelected.avatarRightSide]}
                source={{uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
            />
            {/* Icon style is very specific for this case and will likely not work in different situations. */}
            <MaterialCommunityIcons
                name={'menu'}
                size={20}
                color={"#030849"}
                style={styleSelected.menuCircleAvatarRightSide}
            />
        </View>
    )
}