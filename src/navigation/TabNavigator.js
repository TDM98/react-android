import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import LoginScreen1 from "../screens/LoginScreen1";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={LoginScreen1} />
      <Tab.Screen name="CalendarScreen" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;