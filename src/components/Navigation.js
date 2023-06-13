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
import { Alert } from 'react-native';

import CustomDrawerContent from './CustomDrawerContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabHome = () => {

  <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 18 },
      activeTintColor: 'red',
      inactiveTintColor: 'black'
    }}
  >
    <Tab.Screen
      name="Screen 1"
      component={HomeScreen}  // Replaced Screen 1
    />
    <Tab.Screen
      name="Screen 2"
      component={SettingScreen}  // Replaced Screen 2
    />
    <Tab.Screen
      name="Screen 3"
      component={AddMeetingScreen}  // Replaced Screen 3
    />
  </Tab.Navigator>

};

// function CustomDrawerContent(props) {
//   const { logout } = useContext(AuthContext);
//   const BASE_PATH =
//     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
//   const proileImage = 'react_logo.png';
//   return (

//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />

//       <DrawerItem icon={({ color, size }) => (
//         <Ionicons
//           name="log-out-outline"
//           color={color}
//           size={size}
//         />
//       )} label="Log out" onPress={() => {
//         props.navigation.toggleDrawer();
//         Alert.alert(
//           'Log out',
//           'Are you sure log out?',
//           [
//             {
//               text: 'Cancel',
//               onPress: () => {
//                 return null;
//               },
//             },
//             {
//               text: 'Confirm',
//               onPress: () => {
//                 logout();
//               },
//             },
//           ],
//           { cancelable: false },
//         )
//       }} />
//     </DrawerContentScrollView>
//   );
// }

// Side bar
const DrawerHome = () => (
  <Drawer.Navigator screenOptions={{ headerShown: true }} drawerContent={props => <CustomDrawerContent {...props} />}>

    <Drawer.Screen name="Home" component={HomeScreen} options={{
      title: 'Trang chủ',
      drawerIcon: () => <Ionicons name="home-outline" size={20} color="#1F51FF" />
    }} />
    <Drawer.Screen name="Room" component={RoomScreen} options={{
      title: 'Quản lý phòng',
      drawerIcon: () => <Ionicons name="business-outline" size={20} color="#FFBF00" />
    }} />
    <Drawer.Screen name="Calendar" component={CalendarScreen} options={{
      title: 'Quản lý lịch họp',
      drawerIcon: () => <Ionicons name="calendar-outline" size={20} color="#e75784" />
    }} />
    {/* <Drawer.Screen name="MeetingListScreen" component={MeetingListScreen} options={{
      title: 'Danh sách lịch họp',
      drawerIcon: () => <Ionicons name="people-circle-outline" size={20} color="#ff6e40" />
    }} /> */}
    <Drawer.Screen name="Documents" component={Documents} options={{
      title: 'Quản lý tài liệu',
      drawerIcon: () => <Ionicons name="documents-outline" size={20} color="#8a307f" />
    }} />
    <Drawer.Screen name="Setting" component={SettingScreen} options={{
      title: 'Cài đặt',
      drawerIcon: () => <Ionicons name="settings-sharp" size={20} />
    }} />
    <Drawer.Screen name="User Info" component={UserInfo} options={{
      title: 'Thông tin người dùng',
      drawerIcon: () => <Ionicons name="person-circle-sharp" size={20} />
    }} />
    <Drawer.Screen name="AppInfo" component={AppInfo} options={{
      title: 'Liên hệ',
      drawerIcon: () => <Ionicons name="information-circle-sharp" size={20} />
    }} />
  </Drawer.Navigator>
);

// Main Navigator
const MainStackNavigator = () => {
  const { user, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : user.id_token ? (
          <>

            <Stack.Screen
              name="DrawerHome"
              component={DrawerHome}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Room List" component={RoomScreen} />
            <Stack.Screen name="Create" component={PostCreateScreen} options={{
              title: 'Tạo phòng mới'
            }} />
            <Stack.Screen name="Edit" component={RoomEditScreen} options={{
              title: 'Cập nhật phòng'
            }} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />

            <Stack.Screen name="User" component={UserInfo} />

            <Stack.Screen name="Meeting List" component={MeetingListScreen} />
            <Stack.Screen name="EditMeeting" component={EditMeetingScreen} options={{
              title: 'Chỉnh sửa lịch'
            }} />
            <Stack.Screen name="AddMeeting" component={AddMeetingScreen} options={{
              title: 'Thêm lịch mới'
            }}/>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;