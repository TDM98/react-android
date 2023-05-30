// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { LoginNavigator, MainStackNavigator } from "./StackNavigator";
import CalendarScreen from "../screens/CalendarSreen";
import SettingScreen from "../screens/SettingScreen";
import Room from "../screens/Room";
import AppInfo from "../screens/AppInfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import IndexScreen from "../screens/IndexScreen";
import LoginScreen1 from "../screens/LoginScreen1";
import Documents from '../screens/Documents.js'
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Calendar Screen" component={CalendarScreen} options={{
                title: 'Meeting Schedule',
                drawerIcon: () => <Ionicons name="calendar-sharp" size={20} />
            }} />
            <Drawer.Screen name="Room Management" component={Room} options={{
                title: 'Meeting Room',
                drawerIcon: () => <Ionicons name="people-sharp" size={20} />
            }} />
            <Drawer.Screen name="Documents" component={Documents} options={{
                title: 'Documents',
                drawerIcon: () => <Ionicons name="documents-outline" size={20} />
            }} />
            <Drawer.Screen name="Setting" component={SettingScreen} options={{
                title: 'Settings',
                drawerIcon: () => <Ionicons name="settings-sharp" size={20} />
            }} />
            <Drawer.Screen name="AppInfo" component={AppInfo} options={{
                title: 'App Info',
                drawerIcon: () => <Ionicons name="information-circle-sharp" size={20} />
            }} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;