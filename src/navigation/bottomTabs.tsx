import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, ProfilePage, LatestQr} from '../screens';
import {HomeIcon, QrBarIcon, QrIcon, User} from '../constants/svg';
import {Colors} from '../constants/colors';
import {Image} from 'react-native';
import {QrBar} from '../assets';

const Tab = createBottomTabNavigator();

type TabBarProps = {
  text: string;
  icon: JSX.Element;
  onPress: () => void;
};

function MyTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        title: '',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <HomeIcon color={focused ? Colors.WHITE : Colors.GRAY} />;
          },
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <QrBarIcon />;
          },
        }}
        name="LatestQr"
        component={LatestQr}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <User obacity={focused ? 1 : 0.3} />;
          },
        }}
        name="ProfilePage"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
