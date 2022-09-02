import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScalingDrawer from "react-native-scaling-drawer";
import NavigationService from "./NavigationService";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Keyboard, Platform } from "react-native";
// atoms
import drawerAtom from "../recoil/drawerAtom";
// screens
import {
  Personal,
  RegisterCar,
  QrCode,
  CarHistory,
  ProfilePage,
  EditCar,
  AdditionalInformation,
  Date,
  ChooseCar,
  Booking,
  ChooseServise,
  Home,
  QrCodeBooking,
  LatestQr,
  Frequentlyq,
  DealerDetails,
} from "../screens";
//
import DrawerContent from "./DrawerContent";
import drawer from "./drawerRef";
// screens
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import DealersLocations from "../screens/dealersLocations/DealersLocations";
import LocationMap from "../screens/locationMap/LocationMap";
import { Colors } from "../constants/colors";
import Tutorial from "../screens/tutorial/Tutorial";

// ----------------------------------------------------------------------------------------

const AppStack = createStackNavigator();

const MyStack = React.forwardRef((props, myStackRef) => {
  return (
    <AppStack.Navigator
      ref={myStackRef}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="ChooseCar" component={ChooseCar} />
      <AppStack.Screen name="ProfilePage" component={ProfilePage} />
      <AppStack.Screen name="LatestQr" component={LatestQr} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="DealersLocations" component={DealersLocations} />
      <AppStack.Screen name="FAQ" component={Frequentlyq} />
      <AppStack.Screen name="ChooseServise" component={ChooseServise} />
      <AppStack.Screen name="Booking" component={Booking} />
      <AppStack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
      />
      <AppStack.Screen name="QrCode" component={QrCode} />
      <AppStack.Screen name="EditCar" component={EditCar} />
      <AppStack.Screen name="RegisterCar" component={RegisterCar} />
      <AppStack.Screen name="CarHistory" component={CarHistory} />
      <AppStack.Screen name="LocationMap" component={LocationMap} />
      <AppStack.Screen name="DealerDetails" component={DealerDetails} />
      <AppStack.Screen name="Tutorial" component={Tutorial} />
    </AppStack.Navigator>
  );
});

export default function AppNavigation() {
  const setDrawer = useSetRecoilState(drawerAtom);
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  const defaultScalingDrawerConfig = {
    scalingFactor: 0.8,
    minimizeFactor: 0.5,
    swipeOffset: 50,
    frontStyle: {
      backgroundColor: Colors.BACKGROUND,
      borderRadius: drawerStatus === "closed" ? 0 : 18,
      padding: drawerStatus === "closed" ? 0 : 10,
    },
    contentWrapperStyle: {
      backgroundColor: Colors.DRAWER,
    },
  };

  return (
    <ScalingDrawer
      ref={drawer}
      {...defaultScalingDrawerConfig}
      content={<DrawerContent drawerRef={drawer} />}
      onClose={() => setDrawer({ drawerStatus: "closed" })}
      onOpen={() => {
        Keyboard.dismiss();
        setDrawer({ drawerStatus: "opened" });
      }}
    >
      <MyStack
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        drawerRef={drawer}
      />
    </ScalingDrawer>
  );
}
