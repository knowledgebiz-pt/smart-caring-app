import { Platform, StyleSheet, StatusBar } from "react-native";
const colors = require("../style/Colors.json");

const style = StyleSheet.create({
  backgroundPrimary: {
    backgroundColor: colors.Base_Slot_1,
  },
  backgroundLoader: {
    backgroundColor: colors.Base_Slot_1
  },
  container: {
    flex: 1,
    backgroundColor: colors.Base_Slot_2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100
  },
  inputView: {
    backgroundColor: colors.Base_Slot_4,
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "#fff"
  },
  option_buttons: {
    height: 30,
  },
  return_login_button: {
    marginBottom: 100
  },
  new_account_button: {
    height: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.Base_Slot_4,
  },
  pressedLoginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.Base_Slot_1,
  },
  loginText: {
    color: "#fff"
  },
  checkboxView: {
    width: "80%",
    marginBottom: 20,
    marginLeft: 20,
    zIndex: -5,
    flexDirection: "row",
    alignItems: "center"
  },
  inputViewBelowDropdown: {
    backgroundColor: colors.Base_Slot_4,
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    zIndex: -5
  },
  DropDownPicker: {
    backgroundColor: colors.Base_Slot_4,
    borderColor: 'transparent',
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  dropDownContainer: {
    backgroundColor: colors.Base_Slot_1,
    borderRadius: 25
  },
  imageContainer: {
    backgroundColor: colors.Base_Slot_5,
    height: "70%",
    width: "80%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20
  },
  imageContainerNoMarginTop: {
    backgroundColor: colors.Base_Slot_5,
    height: "70%",
    width: "80%",
    alignSelf: "center",
    borderRadius: 15
  },
  smallerImageContainer: {
    backgroundColor: colors.Base_Slot_5,
    height: 400,
    width: "80%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20
  },
  verySmallImageContainer: {
    backgroundColor: colors.Base_Slot_5,
    height: 250,
    width: "80%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20
  },
  paleBlueContainer: {
    marginTop: 45,
    flex: 1,
    justifyContent: "space-evenly",
    borderRadius: 30,
    alignSelf: "center",
    width: "90%",
    backgroundColor: 'rgba(28, 163, 252, 0.1)',
    justifyContent: "space-evenly",
    height: 250
  },
  paleBlueContainerTaller: {
    marginTop: 45,
    flex: 1,
    justifyContent: "space-evenly",
    borderRadius: 30,
    alignSelf: "center",
    width: "90%",
    backgroundColor: 'rgba(28, 163, 252, 0.1)',
    justifyContent: "space-evenly",
    height: 400
  },

  //buttonSize

  buttonSize: {
    height: 50,
    width: "80%",
    alignSelf: "center",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  // text

  textRegular16: {
    fontSize: 16,
    fontWeight: 400
  },
  textBold16: {
    fontSize: 16,
    fontWeight: 600
  },
  textBold20DarkBlue: {
    fontSize: 20,
    fontWeight: 600,
    color: "#030849"
  },
  textRegular14Gray: {
    fontSize: 14,
    fontWeight: 400,
    color: "#656565"
  },
  textDisclaimer: {
    fontSize: 11,
    fontWeight: 400,
    color: '#030849'
  },
  textBold: {
    fontWeight: 600
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: 600,
    color: "white"
  },

  text12Regular: {
      fontSize: 12
  },

  // Safe Area
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default style;
