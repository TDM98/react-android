import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen1} from '../screens';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={LoginScreen1}>
      {/* <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({route}) => ({
          headerTintColor: COLORS.white,
          // headerBackTitle: 'Back',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          title: route.params.userId,
        })}
      /> */}
      <Stack.Screen
        name={LoginScreen1}
        component={LoginScreen1}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name={ROUTES.REGISTER} component={Register} /> */}
      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
