import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../screens/CalendarSreen";'../screens/CalendarSreen'
import DetailsScreen from "../screens/DetailsScreen";
import FormScreen from "../screens/FormScreen";
import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import * as constant from "../controllers/constants";
const Stack = createStackNavigator();

const  MainStackNavigator= () => {
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
            options={{ title: '' }}
          />
           <Stack.Screen
            name="IndexScreen"
            component={IndexScreen}
            options={{ title: 'Meeting List' }}
          />
          <Stack.Screen
            name="CalendarScreen"
            component={CalendarScreen}
            options={{ title: 'Welcome' }}
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
        </Stack.Navigator> 
      );
}
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
}
export {MainStackNavigator,ContactStackNavigator};
