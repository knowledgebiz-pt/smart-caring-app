import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 10
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <>
      <Text>{item.title}</Text>
      
    <View style={styles.container} key={index}>
      <Image
        source={ item }
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
    height: "80%",
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
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem