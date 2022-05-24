import React, { useEffect, useContext, useCallback, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthContext } from "../../context/AuthContext";
import authAtom from "../../recoil/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/colors";
import { AxiosContext } from "../../context/AxiosContext";
import updateUserInfoAtom from "../../recoil/updateUserInfo";

const Splash = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { authAxios } = useContext(AxiosContext);
  const updateUserInfo = useRecoilValue(updateUserInfoAtom);

  const loadJWT = useCallback(async () => {
    try {
      const asyncStorageAccessToken = await AsyncStorage.getItem("accessToken");
      const asyncStorageRefreshToken = await AsyncStorage.getItem(
        "refreshToken"
      );

      authContext.setAuthState({
        accessToken: asyncStorageAccessToken || null,
        refreshToken: asyncStorageRefreshToken || null,
        authenticated: asyncStorageAccessToken !== null,
      });
    } catch (error) {
      console.log(`JWT AUTH ERROR: ${error.message}`);
    }
  }, []);

  const userDataFetcher = useCallback(async () => {
    if (authContext.authState.authenticated === true) {
      await authAxios
        .get("/user/auth/get")
        .then((response) => {
          setAuth({ ...auth, userData: response.data.result.data });
        })
        .catch((error) => console.log("not answer", error));
    } else {
      setAuth({ authenticated: false });
    }
  }, [authContext.authState, updateUserInfo]);

  useEffect(() => {
    loadJWT();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then(async (response) => {
      if (response) {
        await userDataFetcher();
        navigation.navigate("Drawer");
      } else {
        navigation.navigate("LaunchingPage");
      }
    });
  }, [authContext.authState, userDataFetcher]);

  return (
    <View
      style={{
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={Colors.BUTTON} />
    </View>
  );
};

export default Splash;
