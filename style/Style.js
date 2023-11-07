import { Platform, StyleSheet, StatusBar } from "react-native";
const colors = require("../style/Colors.json");

const style = StyleSheet.create({
  backgroundPrimary: {
    backgroundColor: colors.BaseSlot1,
  },
  backgroundLoader: {
    backgroundColor: colors.BaseSlot1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: colors.BaseSlot2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100
  },
  inputView: {
    backgroundColor: colors.BaseSlot4,
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
    backgroundColor: colors.BaseSlot4,
  },
  pressedLoginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.BaseSlot1,
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
    backgroundColor: colors.BaseSlot4,
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    zIndex: -5
  },
  DropDownPicker: {
    backgroundColor: colors.BaseSlot4,
    borderColor: 'transparent',
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  dropDownContainer: {
    backgroundColor: colors.BaseSlot1,
    borderRadius: 25
  },
  imageContainer: {
    backgroundColor: colors.BaseSlot5, 
    height: "70%", 
    width: "80%", 
    alignSelf: "center", 
    borderRadius: 15,
    marginTop: 20
  },
  imageContainerNoMarginTop: {
    backgroundColor: colors.BaseSlot5, 
    height: "70%", 
    width: "80%", 
    alignSelf: "center", 
    borderRadius: 15
  },
  smallerImageContainer: {
    backgroundColor: colors.BaseSlot5, 
    height: 400, 
    width: "80%", 
    alignSelf: "center", 
    borderRadius: 15, 
    marginTop: 20
  },
  verySmallImageContainer: {
    backgroundColor: colors.BaseSlot5, 
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
  logoLeftSide: {
    width: 150, 
    height: 110, 
    marginLeft: 20, 
    alignSelf: "flex-start"
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
  buttonSizeFullWidth: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSizeTextLeft: {
    height: 50,
    width: "80%",
    alignSelf: "center",
    borderRadius: 30,
    justifyContent: "center"
  },
  buttonSizeFullWidthTextLeft: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    borderRadius: 30,
    justifyContent: "center"
  },
  postInputSize: {
    width: "56%",
    alignSelf: "center",
    borderRadius: 10,
    textAlignVertical:"top",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop:-21,
    maxHeight: 101,
    minHeight: 101,
  },
  smallButtonPost: {
    borderWidth: 1, 
    borderRadius: 10, 
    flexDirection:"row", 
    height: 30, 
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5, 
    paddingBottom: 5
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
  textBold10DarkBlue: {
    fontSize: 10,
    fontWeight: 600,
    color: "#030849"
  },
  textBold20DarkBlue: {
    fontSize: 20,
    fontWeight: 600,
    color: "#030849"
  },
  textRegular13DarkBlue: {
    fontSize: 13,
    fontWeight: 400,
    color: "#030849"
  },
  textRegular10Gray: {
    fontSize: 10,
    fontWeight: 400,
    color: "#656565"
  },
  textRegular13Gray: {
    fontSize: 13,
    fontWeight: 400,
    color: "#656565"
  },
  textRegular14Gray: {
    fontSize: 14,
    fontWeight: 400,
    color: "#656565"
  },
  textRegular14DarkBlue: {
    fontSize: 14,
    fontWeight: 400,
    color: "#030849"
  },
  textDisclaimer: {
    fontSize: 10,
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
  buttonOutlinePrimaryText: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.BaseSlot2
  },
  buttonOutlineSuccessText: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.BaseSlot4
  },
  buttonOutlineSuccessIconText: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.BaseSlot4
  },
  buttonOutlinePrimaryIconText: {
    fontSize: 13,
    fontWeight: 400,
    color: colors.BaseSlot2
  },
  buttonOutlineDarkBlueIconText: {
    fontSize: 13,
    fontWeight: 400,
    color: '#030849'
  },

  text12Regular: {
      fontSize: 12
  },

  // Safe Area
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  // Avatar
  avatar: {
    paddingTop: 20,
    height: 75,
    width: 75,
    borderRadius: 100,
    padding: 20,
  },
  plusCircleAvatar: {
    borderRadius:30, 
    position:"absolute",
    left:"52%",
    top:"55%", 
    position: "absolute",
    backgroundColor: colors.BaseSlot3
  },
  avatarRightSide: {
    alignSelf: "flex-end", 
    marginLeft: 150, 
    height: 50, 
    width: 50, 
    marginBottom: 15
  },
  avatarLeftSide: {
    alignSelf: "flex-start",
    height: 25,
    width: 25,
    marginLeft: 20
  },
  menuCircleAvatarRightSide: {
    // height: 29,
    // width: 29,
    // borderWidth: 2,
    // borderRadius: 30,
    // paddingTop: 4.5,
    // paddingLeft: 4.5,
    // marginTop: -40,
    // marginLeft: 32,
    // backgroundColor: colors.BaseSlot1,

    height: 30, 
    width: 30, 
    backgroundColor: colors.BaseSlot1, 
    position: "absolute", 
    bottom: -5, 
    right: -10, 
    borderRadius: 50, 
    overflow: "hidden", 
    justifyContent: "center", 
    alignItems: "center", 
    alignContent: "center", 
    borderWidth: 2, 
    borderColor: colors.BaseSlot6 
  },

  // Date picker
  datePickerButton: {
    height: 50,
    backgroundColor: colors.BaseSlot1,
    flexDirection: "row",
    width: "100%",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.BaseSlot5,
    alignItems: "center",
    justifyContent: "center"
  },

  // Phone input
  phoneInputTextContainer: {
    backgroundColor: "transparent", 
    height: 100, 
    marginRight: 20
  },
  phoneInputTextInput: {
    width: "100%", 
    height: 50
  },
  phoneInputCodeText: {
    color: "#656565",
    fontSize: 13,
    marginLeft: -20
  },
  phoneInputCountryPickerButton: {
    marginLeft: -20
  },

  // Feed
  feedPostContainer: {
    width: "100%",
    borderRadius: 15,
    paddingTop:10,
    paddingBottom: 20,
    paddingRight: 10
  },
  feedPostUserName: {
    marginLeft:5,
    textAlignVertical:"center",
    fontSize: 11
  },
  feedPostRoleIcon: {
    width: 35,
    height: 20,
    marginRight: 20
  },
  feedPostHeartIconPosition: {
    position:"absolute",
    marginLeft: 325
  },
  feedPostHeartIcon: {
    textAlignVertical:"center",
    fontSize:20,
    marginTop:20
  },
  feedPostContentView: {
    marginLeft: 0
  },
  feedPostContentText: {
    fontSize: 10, paddingRight:10
  },
  feedPostContentUrlPreviewImage: {
    width: "92%",
    height: 140,
    marginLeft: 0,
    marginTop: 10,
    objectFit: "contain"
  },
  feedPostContentUrl: {
    fontSize: 10,
    paddingRight:10,
    color:colors.BaseSlot2,
    fontStyle:"italic",
    textDecorationLine:"underline"
  },
  feedPostButtonsView: {
    flexDirection:"row",
    marginTop:10
  },
  feedPostButtonsText: {
    fontSize: 10,
    alignSelf:"center"
  },
  feedPostContentSeeCommentsTouchableOpacity: {
    flex: 1,
    textAlign: "right",
    alignSelf:"center",
    marginRight:26
  },
  feedPostContentSeeComments: {
    textAlign: "right",
    fontSize: 9,
    color: colors.BaseSlot3,
    textDecorationLine: "underline"
  },
  modalCenteredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 35,
  },
  modalOpenButton: {
    position:'absolute', 
    backgroundColor: colors.BaseSlot4, 
    width: 80, 
    borderBottomLeftRadius:30, 
    paddingRight:30, 
    paddingTop:10, 
    paddingBottom:5, 
    borderTopLeftRadius:30, 
    alignItems:"center", 
    right: 0,
    bottom: 20
  },
  journalEntryCreationOpenButton: {
    position:'absolute', 
    marginLeft: 346, 
    marginTop: 700, 
    backgroundColor: colors.BaseSlot4, 
    width: 80, 
    borderBottomLeftRadius:30, 
    paddingRight:30, 
    paddingTop:10, 
    paddingBottom:5, 
    borderTopLeftRadius:30, 
    alignItems:"center" 
  },
  feedCommentModalView: {
    flex: 1,
    backgroundColor: 'white',
    verticalAlign: "bottom",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    height:"100%",
    marginTop: 200,
    borderRadius: 20,
    paddingBottom: 35,
  },
  chatComponentTouchableOpacity: {
    height: 80, 
    flexDirection: "row", 
    alignItems: "center"
  },
  chatComponentItem: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    marginLeft: 20,
    marginRight: 10, 
    borderRadius: 60, 
    overflow: "hidden", 
    height: 65, 
    maxWidth: 65
  },
  chatComponentItemImage: {
    width: 70, 
    height: 70
  }
});


export default style;
