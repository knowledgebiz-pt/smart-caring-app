import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useState } from 'react';
import { useColorScheme, Image } from 'react-native';
import style from '../../style/Style'
import styleDark from '../../style/StyleDark'

import HomePage from '../views/HomePage';
import Chat from '../views/Chat';
import ToolBox from '../views/ToolBox';
import MySchedule from '../views/MySchedule';
import Journal from '../views/Journal';
import { useTheme } from 'react-native-paper';

import { useTranslation } from "react-i18next"

const Tab = createMaterialBottomTabNavigator();


export function BottomTab() {
  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"
  let colorScheme = useColorScheme()
  var styleSelected = colorScheme == 'light' ? style : styleDark
  var colors = require('../../style/Colors.json')
  const [homeIcon, setHomeIcon] = useState(require("../../assets/images/home_neg.png"))
  const [chatIcon, setChatIcon] = useState(require("../../assets/images/chat.png"))
  const [toolBoxIcon, setToolBoxIcon] = useState(require("../../assets/images/toolbox.png"))
  const [scheduleIcon, setScheduleIcon] = useState(require("../../assets/images/schedule.png"))
  const [journalIcon, setJournalIcon] = useState(require("../../assets/images/journal.png"))

  const [goUp, setGoUp] = useState(false)

  const {t, i18n} = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      activeColor='white'
      inactiveColor='white'
      barStyle={{backgroundColor: colors.BaseSlot2}}
    //   sceneContainerStyle={{paddingBottom:10}}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: t('navbar_home'),
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode='contain'
              style={{ height: 40, width: 40, justifyContent:"center", alignItems:"center", top:-4, tintColor: "white" }}
              source={homeIcon} />
          ),
        }}
        listeners={{
            tabPress: e => {
                setHomeIcon(require("../../assets/images/home_neg.png"))
                setChatIcon(require("../../assets/images/chat.png"))
                setToolBoxIcon(require("../../assets/images/toolbox.png"))
                setScheduleIcon(require("../../assets/images/schedule.png"))
                setJournalIcon(require("../../assets/images/journal.png"))
                setGoUp(true)
                setTimeout(() => {
                  setGoUp(false)
                }, 250)
            }
        }}
        initialParams={{goUp: goUp}}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: t('navbar_chat'),
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode='contain'
              style={{ height: 40, width: 40, justifyContent:"center", alignItems:"center", top:-4, tintColor: "white" }}
              source={chatIcon} />
          ),
        }}
        listeners={{
            tabPress: e => {
              setHomeIcon(require("../../assets/images/home.png"))
              setChatIcon(require("../../assets/images/chat_neg.png"))
              setToolBoxIcon(require("../../assets/images/toolbox.png"))
              setScheduleIcon(require("../../assets/images/schedule.png"))
              setJournalIcon(require("../../assets/images/journal.png"))
            }
        }}
      />
      <Tab.Screen
        name="ToolBox"
        component={ToolBox}
        options={{
          tabBarLabel: t('navbar_toolbox'),
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode='contain'
              style={{ height: 40, width: 40, justifyContent:"center", alignItems:"center", top:-4, tintColor: "white" }}
              source={toolBoxIcon} />
          ),
        }}
        listeners={{
            tabPress: e => {
              setHomeIcon(require("../../assets/images/home.png"))
              setChatIcon(require("../../assets/images/chat.png"))
              setToolBoxIcon(require("../../assets/images/toolbox_neg.png"))
              setScheduleIcon(require("../../assets/images/schedule.png"))
              setJournalIcon(require("../../assets/images/journal.png"))
            }
        }}
      />
      <Tab.Screen
        name="MySchedule"
        component={MySchedule}
        options={{
          tabBarLabel: t('navbar_schedule'),
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode='contain'
              style={{ height: 40, width: 40, justifyContent:"center", alignItems:"center", top:-4, tintColor: "white" }}
              source={scheduleIcon} />
          ),
        }}
        listeners={{
            tabPress: e => {
              setHomeIcon(require("../../assets/images/home.png"))
              setChatIcon(require("../../assets/images/chat.png"))
              setToolBoxIcon(require("../../assets/images/toolbox.png"))
              setScheduleIcon(require("../../assets/images/schedule_neg.png"))
              setJournalIcon(require("../../assets/images/journal.png"))
            }
        }}
      />
      <Tab.Screen
        name="Journal"
        component={Journal}
        options={{
          tabBarLabel: t('navbar_journal'),
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode='contain'
              style={{ height: 40, width: 40, justifyContent:"center", alignItems:"center", top:-4, tintColor: "white" }}
              source={journalIcon} />
          ),
        }}
        listeners={{
            tabPress: e => {
              setHomeIcon(require("../../assets/images/home.png"))
              setChatIcon(require("../../assets/images/chat.png"))
              setToolBoxIcon(require("../../assets/images/toolbox.png"))
              setScheduleIcon(require("../../assets/images/schedule.png"))
              setJournalIcon(require("../../assets/images/journal_neg.png"))
            }
        }}
      />
    </Tab.Navigator>
  );
}