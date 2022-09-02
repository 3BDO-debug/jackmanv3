import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
// theme
import { Colors } from "../constants/colors";
import { HomeIcon, QrBarIcon, User } from "../constants/svg";

// ----------------------------------------------------------------------------------------------

export default function Footer({ navigation }) {
  return (
    <Animatable.View useNativeDriver animation="fadeInUp">
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <HomeIcon color={Colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.qrButtonWrapper}
            onPress={() => navigation.navigate("LatestQr")}
          >
            <QrBarIcon color={Colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
            <User />
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    paddingVertical: "20@s",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "80@s",
    alignItems: "center",
  },
  qrButtonWrapper: {
    backgroundColor: "#7F7F7F",
    width: "50@s",
    height: "50@s",
    borderRadius: "50@s",
    justifyContent: "center",
    alignItems: "center",
    padding: "20@s",
  },
});
