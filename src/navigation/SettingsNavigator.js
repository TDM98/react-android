import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingScreen, SettingsDetail} from '../screens';
import {ROUTES} from '../constants';
import LoginScreen1 from '../screens/LoginScreen1';

const Stack = createStackNavigator();

function SettingsNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={LoginScreen1}>
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
