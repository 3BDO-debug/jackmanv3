import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import React, { useCallback, useState, useContext, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "react-native-paper";
// context
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
// atoms
import authAtom from "../../recoil/auth";
import popUpAlertAtom from "../../recoil/popUpAlert";
// stylesheet
import styles from "./ProfilePageStyles";
// theme
import { Colors } from "../../constants/colors";
// components
import Screen from "../../components/Screen";
import UserCars from "../../components/__profilePage/userCars/UserCars";
import ProfileSetting from "../profileSetting/ProfileSetting";

// --------------------------------------------------------------------------------

const ProfileTab = ({ activeTab, label, value, pressHandler }) => {
  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      style={styles.profileTab}
      onPress={isActive ? () => true : pressHandler}
    >
      <Text style={styles.profileTabText}>{label}</Text>
      {/* active indicator */}
      <View
        style={[
          styles.profileTabIndicator,
          { backgroundColor: isActive ? Colors.BUTTON : Colors.PLACEHOLDER },
        ]}
      />
    </TouchableOpacity>
  );
};

// --------------------------------------------------------------------------------

const ProfilePage = ({ navigation }) => {
  const userData = useRecoilValue(authAtom)?.userData;

  const { authAxios } = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("cars");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const [keyboardStatus, setKeyboardStatus] = useState(null);

  const handleTabChange = () => {
    if (activeTab === "cars") {
      setActiveTab("settings");
    } else {
      setActiveTab("cars");
    }
  };

  const deleteAccountRequest = useCallback(async () => {
    setDeletingAccount(true);
    await authAxios
      .delete("/user/auth/deleteAccount")
      .then(() => {
        authContext.logout();
        setPopUpAlert({
          visible: true,
          title: "Account deleted",
          body: "Your account has been deleted successfully",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      })
      .catch((error) => {
        console.log("Error deleting account", error);
        setPopUpAlert({
          visible: true,
          title: "Server error",
          body: "Something wrong happened while trying to delete your account.",
          popUpActionText: "understood",
          popUpActionHandler: () => false,
        });
      });
    setDeletingAccount(false);
  }, []);

  const onDeleteAccountButtonPress = () => {
    setPopUpAlert({
      visible: true,
      title: "Attention",
      body: "You are about to delete your account, are you sure you want to continue ?",
      popUpActionText: "Delete my account",
      popUpActionHandler: () => deleteAccountRequest(),
    });
  };

  const renderTabContent = useCallback(() => {
    let content;

    if (activeTab === "cars") {
      content = <UserCars navigation={navigation} />;
    } else {
      content = (
        <ProfileSetting
          navigation={navigation}
          keyboardStatusState={[keyboardStatus, setKeyboardStatus]}
        />
      );
    }

    return content;
  }, [activeTab]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(null);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Screen hideFooter navigation={navigation}>
      {/* Intro */}
      {keyboardStatus !== "Keyboard Shown" && (
        <View style={styles.introWrapper}>
          {/* Avatar wrapper */}
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>{userData?.name[0]}</Text>
          </View>

          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {userData?.name}
            </Text>
          </View>
          {/* Delete account button */}
          <View style={{ marginVertical: 9 }}>
            <Button
              color="#E4646F"
              icon="delete"
              mode="text"
              onPress={onDeleteAccountButtonPress}
              loading={deletingAccount}
              disabled={deletingAccount}
            >
              Delete account
            </Button>
          </View>
        </View>
      )}
      {/* Profile tabs */}
      <View style={styles.profileTabsWrapper}>
        {/* Profile tab */}
        <ProfileTab
          activeTab={activeTab}
          label="CARS"
          value="cars"
          pressHandler={handleTabChange}
        />
        {/* Profile tab */}
        <ProfileTab
          activeTab={activeTab}
          label="SETTINGS"
          value="settings"
          pressHandler={handleTabChange}
        />
      </View>
      {/* Tab content */}
      <View style={styles.tabContentWrapper}>{renderTabContent()}</View>
    </Screen>
  );
};

export default ProfilePage;
