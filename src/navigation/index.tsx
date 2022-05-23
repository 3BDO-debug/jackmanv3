import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import * as Keychain from 'react-native-keychain';
import {
  LaunchingPage,
  SignIn,
  ForgetPassword,
  Personal,
  Verification,
  MapScreen,
  RegisterCar,
  QrCode,
  CarHistory,
  ProfilePage,
  Splash,
  EditCar,
  AdditionalInformation,
  Date,
  ChooseCar,
  Booking,
  ChooseServise,
  Home,
  QrCodeBooking,
} from '../screens';
import drawer from './drawer';
import { Colors } from '../constants/colors';
import { Image, Alert, BackHandler, Button } from 'react-native';
import { Logo } from '../assets';
import { AuthContext } from '../context/AuthContext';
import { useRecoilState } from 'recoil';
import authAtom from '../recoil/auth';
import { AxiosContext } from '../context/AxiosContext';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import DealersLocations from '../screens/dealersLocations/DealersLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackButton } from 'react-navigation';



export type MainStackParamList = {
  LaunchingPage: undefined;
  SignIn: undefined;
  ForgetPassword: undefined;
  Personal: undefined;
  Verification: undefined;
  Drawer: undefined;
  MapScreen: undefined;
  ProfilePage: undefined;
  RegisterCar: undefined;
  Frequentlyq: undefined;
  ProfileSitting: undefined;
  QrCode: undefined;
  CarHistory: undefined;
  Splash: undefined;
  EditCar: undefined;
  AdditionalInformation: undefined;
  Date: undefined;
  ChooseCar: undefined;
  Booking: undefined;
  ChooseServise: undefined;
  Home: undefined;
  QrCodeBooking: undefined;
  NotificationsScreen: undefined
};
export const navigationRef =
  createRef<NavigationContainerRef<MainStackParamList>>();

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default function Screens() {

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name='Splash' component={Splash} />
        <MainStack.Screen name="LaunchingPage" component={LaunchingPage} />
        <MainStack.Screen name="SignIn" component={SignIn} />
        <MainStack.Screen name="ForgetPassword" component={ForgetPassword} />
        <MainStack.Screen name="Personal" component={Personal} />
        <MainStack.Screen name="QrCode" component={QrCode} />
        <MainStack.Screen name="Verification" component={Verification} />
        <MainStack.Screen name="Drawer" component={drawer} />
        <MainStack.Screen name="Notifications" component={NotificationsScreen} />
        <MainStack.Screen name="DealersLocations" component={DealersLocations} />
        <MainStack.Screen name="ProfilePage" component={ProfilePage} />
        <MainStack.Screen
          name="AdditionalInformation"
          component={AdditionalInformation}
        />
        <MainStack.Screen name="Date" component={Date} />
        <MainStack.Screen name="ChooseServise" component={ChooseServise} />
        <MainStack.Screen name="QrCodeBooking" component={QrCodeBooking} />
        <MainStack.Screen name="Home" component={Home} screenOptions={{
          headerStyle: { backgroundColor: 'papayawhip' }, headerLeft: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
        />

        <MainStack.Screen
          name="ChooseCar"
          component={ChooseCar}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            headerTitle: () => (
              <Image source={Logo} style={{ width: 90 }} resizeMode="center" />
            ),
            headerTitleAlign: 'center',
          }}
        />

        <MainStack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            title: '',
          }}
          name="MapScreen"
          component={MapScreen}
        />
        <MainStack.Screen
          name="RegisterCar"
          component={RegisterCar}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            headerTitle: 'Register car',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
            },
            headerTitleAlign: 'center',
          }}
        />

        <MainStack.Screen
          name="Booking"
          component={Booking}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            headerTitle: 'BOOKING',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
            },
            headerTitleAlign: 'center',
          }}
        />

        <MainStack.Screen
          name="EditCar"
          component={EditCar}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            headerTitle: 'Edit car',
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
            },
            headerTitleAlign: 'center',
          }}
        />

        <MainStack.Screen name="CarHistory" component={CarHistory} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
