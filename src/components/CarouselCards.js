import React, { useRef, useState } from "react";
import { View,Text, useColorScheme, TouchableOpacity } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import Carousel, { Pagination } from "react-native-snap-carousel"
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import ButtonPrimary from "./ButtonPrimary";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import { useNavigation,CommonActions } from "@react-navigation/native";

import { useTranslation } from "react-i18next"




export default function CarouselCards({}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')

    const navigation = useNavigation()
    const {t, i18n} = useTranslation()
    
    const [index, setIndex] = useState(0)
    const data = [
        {title: t("features_one"),img:require('../../assets/images/Feature1.png')},
        {title: t("features_two"),img:require('../../assets/images/Feature2.png')},
        {title: t("features_three"),img:require('../../assets/images/Feature3.png')}
      ];

      const isCarousel = useRef(0)

    return (
        <View style={{flex: 1}}>
          <View style={{flex: .83}}>
            <Carousel
              layout="tinder"
              layoutCardOffset={9}
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
              enableMomentum={true}
              decelerationRate={5}
            />

          </View>
          <View style={{flex: .17, marginTop: -50}}>
            <Pagination
            
              dotsLength={data.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                  width: 124,
                  height: 13,
                  borderRadius: 10,
                  marginHorizontal: 0,
                  backgroundColor: colors.BaseSlot2
              }}
              inactiveDotStyle={{width: 25, height: 25, backgroundColor: colors.BaseSlot4}}
              tappableDots={true}
            />

          </View>

            <View style={{flex:.08}}>
              {index == 2 && 
              <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
                <ButtonPrimary title={t("features_button")} event={() => navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
            )} />

              </Animated.View> 

              }
            </View>

        </View>
      )
}