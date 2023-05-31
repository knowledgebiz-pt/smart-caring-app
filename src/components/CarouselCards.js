import React, { useRef, useState } from "react";
import { View,Text, useColorScheme } from "react-native";
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'
import Carousel, { Pagination } from "react-native-snap-carousel"
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

export default function CarouselCards({}) {
    let colorScheme = useColorScheme()
    var styleSelected = colorScheme == 'light' ? style : styleDark
    var colors = require('../../style/Colors.json')
    
    const [index, setIndex] = useState(0)
    const data = [
        require('../../assets/images/Feature1.png'),
        require('../../assets/images/Feature2.png'),
        require('../../assets/images/Feature3.png')
      ];

      const isCarousel = useRef(0)

    return (
        <View>
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
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
                width: 124,
                height: 13,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: "#A8A8A8"
            }}
            inactiveDotStyle={{width: 25, height: 25}}
            tappableDots={true}
          />
        </View>
      )
}