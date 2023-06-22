import { NavigationContainer, SafeAreaView, Image, StyleSheet } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import RoomScreen from '../screens/RoomManagement';
import PostCreateScreen from '../screens/RoomCreateScreen';
import RoomEditScreen from '../screens/RoomEditScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen1 from '../screens/LoginScreen1';
import CalendarScreen from '../screens/CalendarScreen';
import AddMeetingScreen from '../screens/AddMeeting';
import Documents from '../screens/Documents';
import SettingScreen from '../screens/SettingScreen';
import AppInfo from '../screens/AppInfo';
import UserInfo from '../screens/UserInfo';
import HomeScreen from '../screens/HomeScreen';
import MeetingListScreen from '../screens/MeetingListScreen';
import EditMeetingScreen from '../screens/EditMeetingScreen';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button } from 'react-native';

import CustomDrawerContent from './CustomDrawerContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/Notification';
import WeekCalendar from '../screens/WeekCalendar';
import DayCalendar from '../screens/DayCalendar';
import MonthCalendar from '../screens/MonthCalendar';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const GrowStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
// const DrawerHome = () => (
//   <Drawer.Navigator screenOptions={{ headerShown: true }} drawerContent={props => <CustomDrawerContent {...props} />}>

//     <Drawer.Screen name="Home" component={HomeScreen} options={{
//       title: '',
//       headerTransparent:'true',
//       drawerIcon: () => <Ionicons name="home-outline" size={20} color="#1F51FF" 
//       />
//     }} />
//     <Drawer.Screen name="Room" component={RoomScreen} options={{
//       title: 'Quản lý phòng',
//       drawerIcon: () => <Ionicons name="business-outline" size={20} color="#FFBF00" />
//     }} />
//     <Drawer.Screen name="Calendar" component={CalendarScreen} options={{
//       title: 'Quản lý lịch họp',
//       drawerIcon: () => <Ionicons name="calendar-outline" size={20} color="#e75784" />
//     }} />
//     {/* <Drawer.Screen name="MeetingListScreen" component={MeetingListScreen} options={{
//       title: 'Danh sách lịch họp',
//       drawerIcon: () => <Ionicons name="people-circle-outline" size={20} color="#ff6e40" />
//     }} /> */}
//     <Drawer.Screen name="Documents" component={Documents} options={{  
//       title: 'Quản lý tài liệu',
//       drawerIcon: () => <Ionicons name="documents-outline" size={20} color="#8a307f"  />
//     }} />
//     <Drawer.Screen name="Setting" component={SettingScreen} options={{
//       title: 'Cài đặt',
//       drawerIcon: () => <Ionicons name="settings-sharp" size={20} />
//     }} />
//     <Drawer.Screen name="User Info" component={UserInfo} options={{
//       title: 'Thông tin người dùng',
//       drawerIcon: () => <Ionicons name="person-circle-sharp" size={20} />
//     }} />
//     <Drawer.Screen name="AppInfo" component={AppInfo} options={{
//       title: 'Liên hệ',
//       drawerIcon: () => <Ionicons name="information-circle-sharp" size={20} />
//     }} />
//   </Drawer.Navigator>
// );


const HomeStackScreen = ({navigation,route}) => {
if (route.state && route.state.index>0){
  navigation.setOptions({tabBarVisible: false})
} else {
  navigation.setOptions({tabBarVisible: true})
}
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: '',
        headerTransparent: true,
      }} />

      <HomeStack.Screen name="Room" component={RoomScreen} options={{
        title: 'Quản lý phòng họp',
      }} />
      <HomeStack.Screen name="Create" component={PostCreateScreen} options={{
        title: 'Thêm phòng họp',
        tabBarStyle: { display: "none" },
      }} />
      <HomeStack.Screen name="Edit" component={RoomEditScreen} options={{
        title: 'Chỉnh sửa phòng họp',
        tabBarStyle: { display: "none" },
      }} />
      <HomeStack.Screen name="AddMeeting" component={AddMeetingScreen} options={{
        title: 'Thêm lịch họp',
        tabBarStyle: { display: "none" },
      }} />
      <HomeStack.Screen name="EditMeeting" component={EditMeetingScreen} options={{
        title: 'Chỉnh sửa lịch họp',
        tabBarStyle: { display: "none" },
      }} />
      <HomeStack.Screen name="Calendar" component={CalendarScreen} options={{
        title: 'Quản lý lịch họp'
      }} />
      <HomeStack.Screen name="Documents" component={Documents} options={{
        tabBarStyle: { display: 'none' },
      }} />
      <HomeStack.Screen name="Setting" component={SettingScreen} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} options={{
        title: 'Thông báo'

      }} />

    </HomeStack.Navigator>
  )
}

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name='Chat' component={Documents} option={{
        title: ''
      }} />
    </HistoryStack.Navigator>
  )
}

const GrowStackScreen = () => {
  return (
    <GrowStack.Navigator>
      <GrowStack.Screen name='Mail' component={Documents} option={{
        title: ''
      }} />
    </GrowStack.Navigator>
  )
}

const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name='User Info' component={UserInfo} options={{
        title: '',
        headerStyle: { backgroundColor: '#0047AB' }
      }} />
    </UserStack.Navigator>
  )
}


// Main Navigator
const MainStackNavigator = () => {
  const { user, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'HistoryScreen') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
            } else if (route.name === 'GrowScreen') {
              iconName = focused ? 'mail' : 'mail-outline'
            } else if (route.name === 'UserScreen') {
              iconName = focused ? 'person' : 'person-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'white', height: '8%' },
          tabBarLabelStyle: { fontSize: 18 }
        })}>
        {splashLoading ? (
          <Tab.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}

          />

        ) : user.id_token ? (
          <>
            <Tab.Screen name='HomeScreen' component={HomeStackScreen} options={{
              title: 'Home',
              headerShown: false,
            }} />
            <Tab.Screen name='HistoryScreen' component={HistoryStackScreen} options={{
              title: 'Trò chuyện',
              headerShown: false,
            }} />
            <Tab.Screen name='GrowScreen' component={GrowStackScreen} options={{
              title: "Thư",
              headerShown: false,
            }} />
            <Tab.Screen name='UserScreen' component={UserStackScreen} options={{
              title: 'Cá nhân',
              headerShown: false
            }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen1}
              options={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;