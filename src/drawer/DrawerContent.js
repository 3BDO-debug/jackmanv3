import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "react-native-vector-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
// atoms
import navigationAtom from "../recoil/navigation";
import drawerAtom from "../recoil/drawerAtom";
import authAtom from "../recoil/auth";
import popUpAlertAtom from "../recoil/popUpAlert";
// context
import { AuthContext } from "../context/AuthContext";
// theme
import { Colors } from "../constants/colors";
//
import drawerLinks from "./drawerLinks";
import { SettingsIcon } from "../constants/svg";
import CustomText from "../components/customText";
import TextBtn from "../components/textBtn";
import selectedServiceAtom from "../recoil/selectedService";

const DrawerContent = ({ drawerRef }) => {
  //const navigation = useRecoilValue(navigationAtom);
  const authContext = useContext(AuthContext);
  const setDrawerStatus = useRecoilState(drawerAtom)[1];

  const navigation = useNavigation();

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);
  const setSelectedService = useSetRecoilState(selectedServiceAtom);

  const userData = useRecoilValue(authAtom)?.userData;

  const logoutConfirmHandler = () => {
    setDrawerStatus({ drawerStatus: "closed", drawerRef: {} });
    setSelectedService(null);
    authContext.logout();
  };

  const liveSupportHandler = () => {
    let supportPhoneNumber = "";

    if (Platform.OS === "android") {
      supportPhoneNumber = "tel:${01016168201}";
    } else {
      supportPhoneNumber = "telprompt:${01016168201}";
    }
    Linking.openURL(supportPhoneNumber);
  };

  const chatWithUsHandler = () => {
    let msg = "Hi, i have a question.";
    let url = `whatsapp://send?text=${msg}&phone=+201016168201`;
    Linking.openURL(url).catch((error) => {
      console.log("Error trying to open whats app", error);
      setPopUpAlert({
        visible: true,
        title: "Whats App not installed",
        body: "We cant open whats app on your phone, please check whats app is installed on your phone.",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        {/* Avatar wrapper */}
        <View style={styles.avatarWrapper}>
          <View
            style={{
              backgroundColor: Colors.BUTTON,
              width: 40,
              height: 40,
              borderRadius: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 15,
                fontFamily: "Poppins-Bold",
              }}
            >
              {userData?.name[0]}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text numberOfLines={1} style={styles.avatarText}>
              {userData?.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfilePage");
                drawerRef.current.close();
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Colors.BUTTON,
                  textDecorationLine: "underline",
                }}
              >
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Drawer links wrapper */}
        <View style={styles.drawerLinksWrapper}>
          {drawerLinks.map((drawerLink) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(drawerLink.href);
                drawerRef.current.close();
              }}
            >
              <View style={styles.drawerLinkWrapper}>
                {drawerLink.icon}
                <Text style={styles.drawerLinkText}>{drawerLink.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={liveSupportHandler}>
            <View style={styles.drawerLinkWrapper}>
              <Ionicons name="chatbubble-ellipses-outline" size={23} />
              <Text style={styles.drawerLinkText}>Live support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={chatWithUsHandler}>
            <View style={styles.drawerLinkWrapper}>
              <Ionicons name="chatbubbles-outline" size={23} />
              <Text style={styles.drawerLinkText}>Chat with us</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomDrawerContainer}>
          <TouchableOpacity
            onPress={() => {
              drawerRef.current.close();
              navigation?.navigate("ProfilePage", { type: 2 });
            }}
            style={styles.logOutItemContainer}
          >
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
              setPopUpAlert({
                visible: true,
                title: "Attention",
                body: "You are about to log out, do you want to continue ?",
                popUpActionText: "Log out",
                popUpActionHandler: () => logoutConfirmHandler(),
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = ScaledSheet.create({
  wrapper: {
    marginTop: "60@s",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  avatarWrapper: {
    flexDirection: "row",
    paddingLeft: "27@s",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Poppins-Medium",
    fontSize: "12@s",
    color: Colors.BLACK,
    width: 100,
  },
  drawerLinksWrapper: {
    paddingVertical: "80@s",
    paddingHorizontal: "35@s",
  },
  drawerLinkWrapper: {
    flexDirection: "row",

    alignItems: "center",
    marginBottom: "25@s",
    width: "90%",
  },
  drawerLinkText: {
    fontFamily: "Poppins-Regular",
    fontSize: "11@s",
    color: Colors.BLACK,
    marginLeft: "16@s",
  },
  logoutWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "40@s",
  },
  logoutText: {
    fontFamily: "Poppins-Regular",
    fontSize: "13@s",
    textDecorationLine: "underline",
    marginLeft: "16@s",
  },
  bottomDrawerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "17@s",
    paddingBottom: 80,
  },
  logOutItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
  line: {
    height: "70%",
    width: 1,
    backgroundColor: Colors.BLACK,
    marginHorizontal: 10,
  },
});
