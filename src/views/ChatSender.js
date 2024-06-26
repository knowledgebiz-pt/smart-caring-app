import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Appearance,
  useColorScheme,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import style from "../../style/Style";
import styleDark from "../../style/StyleDark";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import Loader from "../components/Loader";
import ChatSenderComponent from "../components/ChatSenderComponent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatService } from "@knowledgebiz/smart-caring-client/client";

export default function ChatSender({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const [msg, setMsg] = useState("");
  const [idUser, setIdUser] = useState("");
  let colorScheme = useColorScheme();
  var styleSelected = colorScheme == "light" ? style : styleDark;
  var colors = require("../../style/Colors.json");
  const refScrollView = useRef();

  //redux
  const user = useSelector(state => state.user);
  const chatMessage = useSelector(state => state.chat);

  // console.log("CHAT MESSAGE OSCAR1", chatMessage)

  // console.log("PARAMS CHAT SENDER")

  // console.log(JSON.stringify(route.params.chat, null, 4))

  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log("OPEN", ChatSender.name, "SCREEN");
    console.log("CHATTTT SENDERRR", route.params.chat);
    console.log("IDDDDDD", route.params.idUser);

    ChatService.updateMessageIsVisibleById(route.params.chat.id_chat)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });

    AsyncStorage.getItem("@token").then(token => {
      setIdUser(token);
    });
    setTimeout(() => {
      refScrollView.current.scrollToEnd({ animated: true });
    }, 100);
    return () => {
      console.log("SCREEN", ChatSender.name, "CLOSE");
    };
  }, []);

  useEffect(
    () => {
      console.log("CHAT ATUALIZADO", chatMessage);
      var listAdd = chatMessage.find(
        item => item.id_chat == route.params.chat.id_chat
      );
      let newArray = [];
      listAdd.message.forEach(item => {
        let i = newArray.findIndex(entry => {
          return entry.date === item.date.substring(0, 10);
        });
        if (i === -1) {
          let obj = {
            date: item.date.substring(0, 10),
            messages: [item]
          };
          newArray.push(obj);
        } else {
          newArray[i]["messages"].push(item);
        }
      });
      setMessage(newArray);
      setTimeout(() => {
        refScrollView.current.scrollToEnd({ animated: true });
        markAsViewed();
      }, 300);
    },
    [chatMessage]
  );

  const markAsViewed = () => {
    console.warn("MARKED AS VIEWED");
  };

  Appearance.getColorScheme();
  Appearance.addChangeListener(({ colorScheme }) => {
    console.log("COLOR THEME WAS ALTER");
    console.log(colorScheme);
    if (Platform.OS === "android")
      NavigationBar.setBackgroundColorAsync(
        colorScheme === "light" ? colors.Base_Slot_1 : colors.Base_Slot_1
      );
  });
  const onLayoutRootView = useCallback(
    async () => {
      if (isLoading) {
        navigation.setOptions({
          headerTitle: () => {
            if (route.params.chat.chat_members.length > 2){
                return (
                    <Text
                      style={[
                        styleSelected.textRegular16,
                        { color: colors.BaseSlot6 }
                      ]}
                    >
                      {
                       t("group")
                      }
                    </Text>
                  );
            }else {
                return (
                    <Text
                      style={[
                        styleSelected.textRegular16,
                        { color: colors.BaseSlot6 }
                      ]}
                    >
                      {
                          route.params.chat.chat_members.find(item => item.id_user != route.params.idUser)?.name
                      }
                    </Text>
                  );
            }
          }
        });
      }
    },
    [isLoading]
  );
  if (!isLoading) {
    return <Loader />;
  }
  let unreadMessageFlag = false;
  return (
    <SafeAreaView
      style={[styleSelected.backgroundPrimary, { flex: 1 }]}
      onLayout={onLayoutRootView}
    >
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, marginBottom: 10 }}
        enabled={true}
        behavior={Platform.OS == "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS == "android" ? 100 : 100}
      >
        <ScrollView
          snapToEnd={true}
          ref={refScrollView}
          style={{ backgroundColor: "#E5E5E5" }}
        >
          {message.map((day, index) => {
            let returnValue = [];
            returnValue.push(
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    height: 2,
                    backgroundColor: colors.BaseSlot6
                  }}
                />
                <View
                  style={{
                    flex: 1.2,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: colors.BaseSlot6
                    }}
                  >
                    {day.date === new Date().toISOString().substring(0, 10)
                      ? t("today")
                      : day.date.substring(10, 8) +
                        "/" +
                        day.date.substring(7, 5) +
                        "/" +
                        day.date.substring(0, 4)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 5,
                    height: 2,
                    backgroundColor: colors.BaseSlot6
                  }}
                />
              </View>
            );
            day.messages
              .filter(item => item.viewed == true)
              .map((curMessage, index) => {
                console.log(curMessage);
                returnValue.push(
                  <ChatSenderComponent
                    message={curMessage}
                    members={route.params.chat.chat_members}
                    idUser={route.params.idUser}
                  />
                );
              });

            if (!unreadMessageFlag) {
              unreadMessageFlag = true;
              day.messages.filter(item => item.viewed == false).length > 0 &&
                returnValue.push(
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors.BaseSlot6,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={[
                        styleSelected.textSecondary,
                        {
                          textAlign: "center",
                          marginTop: 10,
                          color: colors.BaseSlot1
                        }
                      ]}
                    >
                      1 {t("chat_messages_unread")}
                    </Text>
                  </View>
                );
            }

            day.messages
              .filter(item => item.viewed == false)
              .map((message, index) => {
                returnValue.push(
                  <ChatSenderComponent
                    message={message}
                    members={route.params.chat.chat_members}
                    idUser={route.params.idUser}
                  />
                );
              });
            return returnValue;
          })}
          {/* {
                        message.filter(item => item.viewed == true).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} idUser={route.params.idUser} />
                            )
                        })
                    }
  
                    {
                        message.filter(item => item.viewed == false).length > 0 && (
                            <View style={{ width: "100%", backgroundColor: colors.BaseSlot6, height: 40, justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                                <Text style={[styleSelected.textSecondary, { textAlign: "center", marginTop: 10, color: colors.BaseSlot1 }]}>1 {t("chat_messages_unread")}</Text>
                            </View>
                        )
                    }

                    {
                        message.filter(item => item.viewed == false).map((message, index) => {
                            return (
                                <ChatSenderComponent message={message} members={route.params.chat.chat_members} idUser={route.params.idUser} />
                            )
                        })
                    } */}
        </ScrollView>
        <View style={{ maxHeight: 150, flexDirection: "row" }}>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <TextInput
              multiline={true}
              placeholder={t("homepage_post_placeholder")}
              placeholderTextColor={colors.BaseSlot3}
              onChangeText={text => setMsg(text)}
              value={msg}
              style={{
                backgroundColor: colors.BaseSlot1,
                minHeight: 40,
                borderColor: colors.BaseSlot3,
                borderWidth: 1,
                margin: 5,
                borderRadius: 10,
                padding: 10
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log("ENVIANDO MENSAGEM");
                console.log({
                  "id-chat": route.params.chat.id_chat,
                  id_user_sender: user._id.$oid,
                  name_user_sender: user.name,
                  picture_user_sender: user.picture,
                  content: msg,
                  type_content: "text"
                });
                route.params.ws.send(
                  JSON.stringify({
                    "id-chat": route.params.chat.id_chat,
                    id_user_sender: user._id.$oid,
                    name_user_sender: user.name,
                    picture_user_sender:
                      user.picture == undefined ? "" : user.picture,
                    content: msg,
                    type_content: "text"
                  })
                );
                setMsg("");
                route.params.update();
                refScrollView.current.scrollToEnd({ animated: true });
              }}
              style={{
                backgroundColor: colors.BaseSlot2,
                borderRadius: 50,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                  right: 2,
                  top: 2
                }}
                source={require("../../assets/images/arrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
