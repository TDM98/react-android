import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/TabNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';
// Declaration of the navigator stack.

const adjustedTheme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: '#E37399'
  // },
};


export default function App() {
  return (
    <NavigationContainer theme={adjustedTheme}>
      <DrawerNavigator />
    </NavigationContainer>

  );
}