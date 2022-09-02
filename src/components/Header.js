import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useEffect, useState, useCallback } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { MenuIcon, XIcon } from "../constants/svg";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import drawerAtom from "../recoil/drawerAtom";
import drawer from "../drawer/drawerRef";
import { default as MaterialIcon } from "react-native-vector-icons/MaterialIcons";
import { AndroidBackHandler } from "react-navigation-backhandler";
import popUpAlertAtom from "../recoil/popUpAlert";

const Header = ({ isCustomBackHandler, customBackHandler }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const [isHomeScreen, setIsHomeScreen] = useState(false);

  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  const renderHeaderAction = () => {
    let context;
    if (isHomeScreen) {
      if (drawerStatus === "opened") {
        context = (
          <TouchableOpacity onPress={() => drawer.current.close()}>
            <XIcon />
          </TouchableOpacity>
        );
      } else {
        context = (
          <TouchableOpacity onPress={() => drawer.current.open()}>
            <MenuIcon />
          </TouchableOpacity>
        );
      }
    } else {
      context = (
        <TouchableOpacity
          onPress={() =>
            isCustomBackHandler ? customBackHandler() : navigation.goBack()
          }
        >
          <MaterialIcon
            name="keyboard-backspace"
            size={25}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      );
    }
    return context;
  };

  const backButtonHandler = useCallback(() => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (route.name === "Home" && drawerStatus === "closed") {
      setPopUpAlert({
        visible: true,
        title: "Attention",
        body: "You are about to exit the app, do you want to continue ?",
        popUpActionText: "Exit the app",
        popUpActionHandler: () => BackHandler.exitApp(),
      });

      return true;
    } else if (drawerStatus === "opened") {
      drawer?.current?.close();
      return true;
    }

    if (route.name === "Booking") {
      customBackHandler();
      return true;
    }

    return false;
  }, [route.name, drawer?.current, drawerStatus, setPopUpAlert]);

  useEffect(() => {
    if (route.name === "Home") {
      setIsHomeScreen(true);
    } else {
      setIsHomeScreen(false);
    }
  }, [route.name]);

  return (
    <Animatable.View useNativeDriver animation="fadeInDown">
      <AndroidBackHandler onBackPress={backButtonHandler}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {renderHeaderAction()}
            {/* Logo */}
            <View style={styles.logoWrapper}>
              <Image source={require("../assets/images/logo.png")} />
            </View>
            {/* Notifications */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Icon
                name="notifications-outline"
                size={24}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </AndroidBackHandler>
    </Animatable.View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: "5@s",
    paddingVertical: "40@s",
    backgroundColor: Colors.BACKGROUND,
    marginBottom: -30,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
