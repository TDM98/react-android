import { NavigationContainer, SafeAreaView, Image, StyleSheet } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useLayoutEffect } from 'react';
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
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import UserSetting from '../screens/UserSetting';
import { set } from 'date-fns';
import UserPassword from '../screens/UserPassword';

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
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // Room
    if (routeName === "Home"){
      navigation.setOptions({   tabBarStyle: { backgroundColor: 'white', height: '7%', display:'flex' },});
    }
    // Room
    else if (routeName === "Room"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "Create"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "Edit"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    //Calendar
    else if (routeName === "Calendar"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "AddMeeting"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "EditMeeting"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "Documents"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "Setting"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else if (routeName === "Notification") {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }

   
}, [navigation, route]);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: '',
        headerTransparent:true
      }} />

      <HomeStack.Screen name="Room" component={RoomScreen} options={{
        title: 'Quản lý phòng họp',
      }} />
      <HomeStack.Screen name="Create" component={PostCreateScreen} options={{
        title: 'Thêm phòng họp',
      }} />
      <HomeStack.Screen name="Edit" component={RoomEditScreen} options={{
        title: 'Chỉnh sửa phòng họp',
      }} />
      <HomeStack.Screen name="AddMeeting" component={AddMeetingScreen} options={{
        title: 'Thêm lịch họp',
      }} />
      <HomeStack.Screen name="EditMeeting" component={EditMeetingScreen} options={{
        title: 'Chỉnh sửa lịch họp',
      }} />
      <HomeStack.Screen name="Calendar" component={CalendarScreen} options={{
        title: 'Quản lý lịch họp'
      }} />
      <HomeStack.Screen name="Documents" component={Documents} options={{
        title: 'Quản lý tài liệu'
      }} />
      <HomeStack.Screen name="Setting" component={SettingScreen} options={{
        title: 'Cài đặt'
      }}/>
      <HomeStack.Screen name="Notification" component={NotificationScreen} options={{
        title: 'Thông báo'
      }} />

    </HomeStack.Navigator>
  )
}

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name='Chat' component={Documents} options={{
        title: '',
        headerTransparent:true
      }} />
    </HistoryStack.Navigator>
  )
}

const GrowStackScreen = () => {
  return (
    <GrowStack.Navigator>
      <GrowStack.Screen name='Mail' component={Documents} options={{
        title: '',
        headerTransparent: true
      }} />
    </GrowStack.Navigator>
  )
}

const UserStackScreen = ({navigation,route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // Room
    if (routeName === "User Setting"){
      navigation.setOptions({   tabBarStyle: { backgroundColor: 'white', height: '7%', display:'flex' },});
    } else if (routeName === "User Password") {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else if (routeName === "User Info") {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <UserStack.Navigator>
      <UserStack.Screen name='User Setting' component={UserSetting} options={{
        title: '',
        headerTransparent: true
      }} />
      <UserStack.Screen name ='User Info' component={UserInfo} options={{
        title: 'Thông tin cá nhân',
        headerTransparent:true
      }} />
      <UserStack.Screen name='User Password' component={UserPassword} options={{
        title: 'Đổi mật khẩu',
        headerTransparent: true
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
            return <Ionicons name={iconName} size={34} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'white', height: '7%' },
          tabBarLabelStyle: { fontSize: 18 }
        })}>
        {splashLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}

          />

        ) : user.id_token ?(
          <>
            <Tab.Screen name='HomeScreen' component={HomeStackScreen} options={{
              title: 'Home',
              headerShown: false,
              tabBarStyle: { backgroundColor: 'white', height: '7%', display:'flex' },
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