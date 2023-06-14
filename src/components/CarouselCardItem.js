import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 10
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

// having problems using useColorScheme(), therefore I'm currently using styles in the component

const CarouselCardItem = ({ item, index }) => {
  return (
    <>
      
    <View style={styles.container} key={index}>
      <Text style={styles.textBold22DarkBlue}>{item.title}</Text>
      <Image
        source={ item.img }
        style={[styles.image, {overflow:'visible'}]}
      />
      {/* <Text style={styles.body}>{item.body}</Text> */}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {
    width: ITEM_WIDTH,
    height: "70%",
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  },
  textBold22DarkBlue: {
    fontSize: 22,
    fontWeight: 600,
    width: 300,
    color: "#030849",
    alignSelf:"center",
    textAlign: "center"
  },
})

export default CarouselCardItem