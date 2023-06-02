// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { LoginNavigator, MainStackNavigator } from "./StackNavigator";
import CalendarScreen from "../screens/CalendarScreen";
import SettingScreen from "../screens/SettingScreen";
import AppInfo from "../screens/AppInfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Documents from '../screens/Documents.js'
import Navigation from "./Navigation";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Login" component={MainStackNavigator}></Drawer.Screen>
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