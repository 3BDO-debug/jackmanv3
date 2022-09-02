import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import {
  LaunchingPage,
  SignIn,
  Verification,
  ForgetPassword,
  Personal,
} from "../screens";
//
import LocationMap from "../screens/locationMap/LocationMap";
import TermsAndConditions from "../screens/termsAndConditions/TermsAndConditions";

// -----------------------------------------------------------------------------------------------------------------------------------

const Stack = createStackNavigator();

// -----------------------------------------------------------------------------------------------------------------------------------

const NotAuthenticatedLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="LaunchingPage"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="LaunchingPage" component={LaunchingPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="LocationMap" component={LocationMap} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
};

export default NotAuthenticatedLayout;
