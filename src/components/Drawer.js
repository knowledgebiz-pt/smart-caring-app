import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DrawerItems from '../util/DrawerItems';
import { Text, Image, FlatList } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLogoAndProfileImage from './HeaderLogoAndProfileImage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()
function LogoTitle() {
    return (
        <Image
            style={{ width: 150, height: 80, marginBottom: 20 }}
            source={require('../../assets/images/logo.png')}
        />
    );
}
const Item = ({ drawer }) => (
    <Drawer.Screen style={{ height: 300 }}
        key={drawer.name}
        name={drawer.name}
        component={drawer.component}
        options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            drawerLabel: drawer.name,
            drawerIcon: ({ focused }) =>
                drawer.iconType === 'Material' ?
                    <MaterialCommunityIcons
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#09f" : "black"}
                    />
                    :
                    drawer.iconType === 'Feather' ?
                        <Feather
                            name={drawer.iconName}
                            size={24}
                            color={focused ? "#09f" : "black"}
                        />
                        :
                        <FontAwesome5
                            name={drawer.iconName}
                            size={24}
                            color={focused ? "#09f" : "black"}
                        />
        }}
    />
)
export function MyDrawer() {
    return (<>
        {/* <NavigationContainer> */}

            <Drawer.Navigator initialRouteName="Feed" screenOptions={{
                headerStatusBarHeight: 0, drawerPosition: "right", headerLeft: false,
                headerRight: false,
            }}>
                {/* <FlatList data={DrawerItems}
                    renderItem={({item}) => <Item drawer={item}/>} keyExtractor={item => item.name}>

                </FlatList> */}
                {
                    DrawerItems.map(drawer =>
                        <Drawer.Screen style={{height: 300}}
                            key={drawer.name}
                            name={drawer.name}
                            component={drawer.component}
                            options={{
                                headerTitle: (props) => {},
                                drawerLabel: drawer.name,
                                drawerIcon: ({ focused }) =>
                                    drawer.iconType === 'Material' ?
                                        <MaterialCommunityIcons
                                            name={drawer.iconName}
                                            size={24}
                                            color={focused ? "#09f" : "black"}
                                        />
                                        :
                                        drawer.iconType === 'Feather' ?
                                            <Feather
                                                name={drawer.iconName}
                                                size={24}
                                                color={focused ? "#09f" : "black"}
                                            />
                                            :
                                            <FontAwesome5
                                                name={drawer.iconName}
                                                size={24}
                                                color={focused ? "#09f" : "black"}
                                            />
                            }}
                        />)
                }
            </Drawer.Navigator>
        {/* </NavigationContainer> */}
        </>
    );
}