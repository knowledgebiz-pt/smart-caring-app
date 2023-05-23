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

  //buttonSize

  buttonSize: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
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
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default style;
