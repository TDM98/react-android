import { NavigationContainer, SafeAreaView, Image, StyleShee, Text } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Alert } from 'react-native';
const CustomDrawerContent = (props) => {
    const { logout } = useContext(AuthContext);
    return (

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />

                <DrawerItem icon={({ color, size }) => (
                    <Ionicons
                        name="log-out-outline"
                        color={color}
                        size={size}
                    />
                )} label="Log out" onPress={() => {
                    props.navigation.toggleDrawer();
                    Alert.alert(
                        'Log out',
                        'Are you sure log out?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => {
                                    return null;
                                },
                            },
                            {
                                text: 'Confirm',
                                onPress: () => {
                                    logout();
                                },
                            },
                        ],
                        { cancelable: false },
                    )
                }} />
            </DrawerContentScrollView>
  
    );
}
export default CustomDrawerContent;