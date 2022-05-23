import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useDrawerStatus } from "@react-navigation/drawer";
import { MenuIcon, XIcon } from "../constants/svg";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import drawerStatusAtom from "../recoil/drawerStatus";

const Header = ({ drawerOpenHandler, drawerCloseHandler }) => {
  const [isDrawerOpen, setDrawerStatus] = useRecoilState(drawerStatusAtom);
  const navigation = useNavigation();
  const drawer = useDrawerStatus();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {drawer === "open" ? (
          <TouchableOpacity onPress={drawerCloseHandler}>
            <XIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={drawerOpenHandler}>
            <MenuIcon />
          </TouchableOpacity>
        )}
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/images/logo.png")} />
        </View>
        {/* Notifications */}
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icon name="notifications-outline" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: "5@s",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
