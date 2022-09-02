import { View, Keyboard, Text, Alert, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
// atoms
import authAtom from "../../recoil/auth";
import userLocationAtom from "../../recoil/userLocation";
import signedWithAppleAtom from "../../recoil/signedWithApple";
// context
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
// theme
import styles from "./ProfileSettingStyles";
// components
import ProfileSettingItem from "../../components/__profilePage/profileSettings/ProfileSettingItem";
import { scale } from "react-native-size-matters";

// ------------------------------------------------------------------

const ProfileSetting = ({ navigation, keyboardStatusState }) => {
  const [userData, setUserData] = useRecoilState(authAtom);
  const [userDataToBeViewed, setUserDataToBeViewed] = useState([]);
  const userLocation = useRecoilValue(userLocationAtom)?.locationName;
  const [authenticatedUsingThirdParty, setIsAuthenticatedUsingThirdParty] =
    useState(false);

  const [keyboardStatus, setKeyboardStatus] = keyboardStatusState;

  const { authAxios } = useContext(AxiosContext);

  const isSignedWithApple = useRecoilValue(signedWithAppleAtom);

  const checkUserThirdPartyAuthentication = useCallback(async () => {
    await authAxios
      .get("/user/auth/checkThirdParty")
      .then((response) => {
        setIsAuthenticatedUsingThirdParty(
          response.data.result.data.isThirdParty
        );
      })
      .catch((error) => {
        console.log("Error checking third party authentication", error);
      });
  }, []);

  const userLocationName = useCallback(() => {
    let locationName;
    if (userLocation) {
      locationName = userLocation;
    } else if (userData?.userData?.locationName) {
      locationName = userData.userData.locationName;
    } else {
      locationName = "Please set up your location";
    }

    return locationName;
  }, [userData, userLocation]);

  const userDataUpdater = useCallback(async () => {
    await authAxios
      .get("/user/auth/get")
      .then((response) => {
        setUserData({ ...userData, userData: response.data.result.data });
      })
      .catch((error) => {
        console.log("Failed updating user data at profile setting", error);
      });
  }, [authAxios, userData]);

  const generateProfileSettings = () => {
    const data = [
      { label: "Name", value: userData?.userData?.name, apiParam: "name" },
      {
        label: "Email",
        value: userData?.userData?.email,
        apiParam: "email",
      },
      { label: "Password", value: "********", apiParam: "password" },
      {
        label: "Location name",
        value: userLocationName(),
        apiParam: "locationName",
      },
    ];

    setUserDataToBeViewed([...data]);
  };

  useEffect(() => {
    generateProfileSettings();
  }, [userData, userLocationName, authenticatedUsingThirdParty]);

  useEffect(() => {
    checkUserThirdPartyAuthentication();
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        { height: keyboardStatus === "Keyboard Shown" ? "20%" : "100%" },
      ]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {userDataToBeViewed.map((userInfo, index) => {
          let render = true;
          if (isSignedWithApple && userInfo.apiParam === "email") {
            render = false;
          } else {
            render = true;
          }
          return (
            render && (
              <ProfileSettingItem
                key={index}
                data={userInfo}
                userDataUpdater={userDataUpdater}
                authenticatedUsingThirdParty={authenticatedUsingThirdParty}
                keyboardStatusState={[keyboardStatus, setKeyboardStatus]}
              />
            )
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProfileSetting;
