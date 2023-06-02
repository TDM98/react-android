import { NavigationContainer, SafeAreaView, Image, StyleSheet } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen1 from '../screens/LoginScreen1';
import CalendarScreen from '../screens/CalendarScreen';
import AddMeetingScreen from '../screens/AddMeeting';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Documents from '../screens/Documents';
import SettingScreen from '../screens/SettingScreen';
import AppInfo from '../screens/AppInfo';
import UserInfo from '../screens/UserInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  const BASE_PATH =
  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
const proileImage = 'react_logo.png';
  return (

    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem icon={({ color, size }) => (
        <Ionicons
          name="log-out-outline"
          color={color}
          size={size}
        />
      )} label="Log out" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}

// Side bar
const DrawerHome = () => (
  <Drawer.Navigator screenOptions={{ headerShown: true }} drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} options={{
      title: 'Home',
      drawerIcon: () => <Ionicons name="home-outline" size={20} />
    }} />
    <Drawer.Screen name="Calendar" component={CalendarScreen} options={{
      title: 'Calendar',
      drawerIcon: () => <Ionicons name="calendar-outline" size={20} />
    }} />
    <Drawer.Screen name="AddMeetingScreen" component={AddMeetingScreen} options={{
      title: 'Add Meeting',
      drawerIcon: () => <Ionicons name="people-circle-outline" size={20} />
    }} />
    <Drawer.Screen name="CreateRoom" component={PostCreateScreen} options={{
      title: 'Create room',
      drawerIcon: () => <Ionicons name="globe-outline" size={20} />
    }} />
    <Drawer.Screen name="Documents" component={Documents} options={{
      title: 'Documents',
      drawerIcon: () => <Ionicons name="documents-outline" size={20} />
    }} />
    <Drawer.Screen name="Setting" component={SettingScreen} options={{
      title: 'Settings',
      drawerIcon: () => <Ionicons name="settings-sharp" size={20} />
    }} />
     <Drawer.Screen name="User Info" component={UserInfo} options={{
      title: 'User Info',
      drawerIcon: () => <Ionicons name="person-circle-sharp" size={20} />
    }} />
    <Drawer.Screen name="AppInfo" component={AppInfo} options={{
      title: 'App Info',
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
            <Stack.Screen name="Room List" component={HomeScreen} />
            <Stack.Screen name="Create" component={PostCreateScreen} />
            <Stack.Screen name="Edit" component={PostEditScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="AddMeeting" component={AddMeetingScreen} />
            <Stack.Screen name="User" component={UserInfo} />
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