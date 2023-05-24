import * as React from 'react';
import { NavigationContainer, DrawerActions, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from "native-base";
// Import Screens files.
import FormScreen from './screens/FormScreen';
import IndexScreen from './screens/IndexScreen';
import DetailsScreen from './screens/DetailsScreen';
import CalendarScreen from './screens/CalendarSreen';
// Import constants.js
import * as constant from './controllers/constants';
import LoginScreen from './screens/LoginScreen';

// Declaration of the navigator stack.
const Stack = createStackNavigator();

const adjustedTheme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: '#E37399'
  // },
};
const MyDrawer = () => {
  return (
    <MyDrawer.Navigator initialRouteName="IndexScreen">
      <MyDrawer.Screen name="IndexScreen" component={IndexScreen}/>

    </MyDrawer.Navigator>
  )
};
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: constant.backgroundColor,
        },
        headerTintColor: constant.headerTintColor,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={{ title: 'Meeting List' }}
      />
      <Stack.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ title: 'Add Meeting' }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Update Meeting' }}
      />
      <Stack.Screen
      name="MyDrawer" component={MyDrawer}
      />
    </Stack.Navigator> 
  );
}

export default function App() {
  return (
    <NavigationContainer theme={adjustedTheme}>
      <MyStack />
    </NavigationContainer>
  );
}