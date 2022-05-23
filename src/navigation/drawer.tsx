import React, { FC, useContext } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerToggleButton,
  useDrawerProgress,
  useDrawerStatus,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import { Frequentlyq } from '../screens';
import CustomText from '../components/customText';
import {
  FqIcon,
  HomeIcon,
  LocationIcon,
  MenuIcon,
  QRIcon,
  SettingsIcon,
  XIcon,
} from '../constants/svg';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import TextBtn from '../components/textBtn';
import MyTabs from './bottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_CURRENT_TOKEN } from '../redux/actionTypes';
import payload from '../api/payload';
import LogoImage from '../components/logo';
import { Logo, QrIcon } from '../assets';
import { AuthContext } from "../context/AuthContext";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authAtom from '../recoil/auth';
import Header from '../components/Header';
import drawerStatusAtom from '../recoil/drawerStatus';


export type DrawerStackParamList = {
  MyTabs: undefined;
  ProfilePage: undefined;
  Frequentlyq: undefined;
};

const Stack = createNativeStackNavigator<DrawerStackParamList>();
const Drawer = createDrawerNavigator<DrawerStackParamList>();

type ScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Screens: FC<ScreenProps> = ({ navigation }) => {
  const progress = useDrawerProgress();


  /*   const scale = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    }); */

  /*   const borderRadius = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [0, 20],
    }); */

  /*   const animatedStyle = { borderRadius, transform: [{ scale }] };
   */

  const isDrawerOpen = useDrawerStatus() === 'open';
  const setDrawerStatus = useSetRecoilState(drawerStatusAtom);

  return (
    <View style={[styles.stack]} >
      <Stack.Navigator
        screenOptions={{
          //   headerTransparent: true,
          //   headerShown: false,
          headerStyle: { backgroundColor: 'transparent' },
          headerShadowVisible: false,
          title: '',
          contentStyle: { backgroundColor: 'transparent' },

          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                width: "100%"
              }}>
              <Header drawerOpenHandler={() => {
                setDrawerStatus(true);
                navigation.openDrawer();
              }} drawerCloseHandler={() => {
                setDrawerStatus(false);
                navigation.closeDrawer();
              }} />
            </View>
          ),
        }}>
        <Stack.Screen name="MyTabs">
          {props => <MyTabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Frequentlyq">
          {props => <Frequentlyq {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

type ItemProps = {
  text: string;
  icon: JSX.Element;
  onPress: () => void;
};

const CustomDrawerItem: FC<ItemProps> = ({ onPress, text, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.drawerItemContainer}>
      <View style={styles.drawerIconContainer}>{icon}</View>

      <CustomText text={text} color="black" size={13} />
    </TouchableOpacity>
  );
};

type DrawerContentProps = {
  props?: any;
};

const DrawerContent: FC<DrawerContentProps> = props => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const userData = useRecoilValue(authAtom)?.userData || {};
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const setDrawerStatus = useSetRecoilState(drawerStatusAtom);
  return (
    <DrawerContentScrollView
      keyboardShouldPersistTaps={'handled'}
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        paddingLeft: 27,
        justifyContent: 'space-between',
        paddingBottom: 69,
      }}>
      <View>
        <View style={styles.userInfoContainer}>
          {authContext.authState.authenticated && <View style={styles.photoContainer}>
            {userData?.photo ? (
              <Image
                source={userData?.photo}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <CustomText
                text={
                  Object.keys(userData).length != 0
                    ? userData?.name.split(' ').length > 1
                      ? userData?.name.split(' ')[0][0] +
                      userData?.name.split(' ')[1][0]
                      : userData?.name.split(' ')[0][0]
                    : ''
                }
                size={18}
                fontFamily="bold"
                color="black"
              />
            )}
          </View>}
          <View>
            <CustomText color="black" text={userData?.name} />
            <TextBtn
              text="Edit Profile"
              textSize={11}
              fontFamily="regular"
              onPress={() => {
                setDrawerStatus(false);
                props.navigation.closeDrawer();
                props.navigation.navigate('ProfilePage', { type: 1 });
              }}
            />
          </View>
        </View>
        <View>
          <CustomDrawerItem
            text="Home"
            icon={
              <View style={styles.drawerIconContainer}>
                <HomeIcon color={Colors.BLACK} />
              </View>
            }
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />

          <CustomDrawerItem
            text="Latest services"
            icon={
              <View style={styles.drawerIconContainer}>
                <Image source={QrIcon} style={{ width: 25, height: 25 }} />
              </View>
            }
            onPress={() => {
              props.navigation.navigate('LatestQr');
            }}
          />

          <CustomDrawerItem
            text="Dealer’s Locations"
            icon={
              <View style={styles.drawerIconContainer}>
                <LocationIcon color={Colors.BLACK} />
              </View>
            }
            onPress={() => {
              props.navigation.navigate('DealersLocations');
            }}
          />

          <CustomDrawerItem
            text="FAQ"
            icon={
              <View style={styles.drawerIconContainer}>
                <FqIcon color={Colors.BLACK} />
              </View>
            }
            onPress={() => {
              props.navigation.navigate('Frequentlyq');
            }}
          />
        </View>
      </View>

      <View style={styles.bottomDrawerContainer}>
        <TouchableOpacity
          onPress={() => {
            setDrawerStatus(false);
            props.navigation.closeDrawer();
            props.navigation.navigate('ProfilePage', { type: 2 });
          }}
          style={styles.logOutItemContainer}>
          <View style={styles.drawerIconContainer}>
            <SettingsIcon />
          </View>

          <CustomText text="Settings" color="black" size={13} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TextBtn
          text="Log out"
          textColor="black"
          fontFamily="regular"
          underline={false}
          onPress={() => {
            Alert.alert('', 'Are you sure to logout?', [
              {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  authContext.logout();
                  props.navigation.navigate("LaunchingPage");
                },
              },
            ], { cancelable: true, onDismiss: () => console.log("dismised") });
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: 220,
            backgroundColor: Colors.DRAWER,
            paddingTop: 20,
          },
          drawerContentContainerStyle: { flex: 1 },
          drawerActiveBackgroundColor: 'transparent',
          sceneContainerStyle: { backgroundColor: Colors.DRAWER },
          headerShown: false,

        }}
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="MyTabs">
          {props => <Screens {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'scroll',
    borderWidth: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  drawerItem: {},
  drawerLabel: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 130,
    marginLeft: 20
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.WHITE,
    marginRight: 20,
    overflow: 'hidden',
  },
  drawerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  logOutItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: '70%',
    width: 1,
    backgroundColor: Colors.BLACK,
    marginHorizontal: 10,
  },
  bottomDrawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
