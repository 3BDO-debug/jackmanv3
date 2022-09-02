import React, { useCallback, useContext, useEffect, useState } from "react";
import LaunchingPageView from "./view";
import { ActivityIndicator, Alert, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { AxiosContext } from "../../context/AxiosContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "../../constants/colors";
import { ResponseType, makeRedirectUri } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const LaunchingPage = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [logginIn, setLoggingIn] = useState(false);

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest(
    {
      clientId: "312478717299488",
      responseType: ResponseType.Token,
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const facebookSignIn = useCallback(async (accessToken) => {
    await publicAxios
      .get(`/user/auth/facebook?access_token=${accessToken}`)
      .then(async (response) => {
        authContext.setAuthState({
          accessToken: response.data.result.data.token,
          refreshToken: response.data.result.data.refreshToken,
          authenticated: true,
        });
        await AsyncStorage.setItem(
          "accessToken",
          response.data.result.data.token
        );
        await AsyncStorage.setItem(
          "refreshToken",
          response.data.result.data.refreshToken
        );
      })
      .catch((error) => {
        console.log(
          "Error sending facebook token to backend",
          error.response.data
        );
        Alert.alert("Server error", "Cannot contact our servers at the moment");
      });
    setLoggingIn(false);
  }, []);

  useEffect(() => {
    if (fbResponse?.type === "success") {
      facebookSignIn(fbResponse.params.access_token);
    } else {
      setLoggingIn(false);
      if (fbResponse?.type === "error") {
        Alert.alert(
          "Facebook login failed",
          "Login in with facebook has been cancelled"
        );
      }
    }
  }, [fbResponse]);

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest(
      {
        androidClientId:
          "808627771301-hqk7h9ag24stho20hnhvvbt2jevb9omn.apps.googleusercontent.com",
        iosClientId:
          "808627771301-6h83v0ib6frqu0a9ug4mbvr9lqhi9nkt.apps.googleusercontent.com",
        expoClientId:
          "808627771301-ma36snc1747sp2v9t7s88udv5ljjco5h.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({ useProxy: true }),
      },
      { useProxy: true }
    );

  const googleSignIn = useCallback(
    async (accessToken) => {
      await publicAxios
        .get(`/user/auth/google?access_token=${accessToken}`)
        .then(async (response) => {
          authContext.setAuthState({
            accessToken: response.data.result.data.token,
            refreshToken: response.data.result.data.refreshToken,
            authenticated: true,
          });
          await AsyncStorage.setItem(
            "accessToken",
            response.data.result.data.token
          );
          await AsyncStorage.setItem(
            "refreshToken",
            response.data.result.data.refreshToken
          );
        })
        .catch((error) => {
          console.log("Error sending google token to backend", error);
          Alert.alert(
            "Server error",
            "Cannot contact our servers at the moment"
          );
        });
      setLoggingIn(false);
    },
    [publicAxios, authContext]
  );

  const appleSignIn = useCallback(async (identityToken) => {
    await publicAxios
      .get(`/user/auth/apple?access_token=${identityToken}`)
      .then(async (response) => {
        authContext.setAuthState({
          accessToken: response.data.result.data.token,
          refreshToken: response.data.result.data.refreshToken,
          authenticated: true,
        });
        await AsyncStorage.setItem(
          "accessToken",
          response.data.result.data.token
        );
        await AsyncStorage.setItem(
          "refreshToken",
          response.data.result.data.refreshToken
        );
      })
      .catch((error) => {
        console.log("Error sending apple token to backend", error);
        Alert.alert("Server error", "Cannot contact our servers at the moment");
      });
    setLoggingIn(false);
  }, []);

  useEffect(() => {
    if (googleResponse?.type === "success") {
      googleSignIn(googleResponse.authentication.accessToken);
    } else {
      setLoggingIn(false);
      if (googleResponse?.type === "error") {
        Alert.alert(
          "Google login failed",
          "Login in with google has been cancelled"
        );
      }
    }
  }, [googleResponse]);

  return (
    <View style={{ flex: 1 }}>
      {logginIn ? (
        <View
          style={{
            backgroundColor: Colors.BACKGROUND,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator color={Colors.BUTTON} size="large" />
        </View>
      ) : (
        <LaunchingPageView
          singFacebook={() => {
            setLoggingIn(true);
            fbPromptAsync();
          }}
          signGoogle={() => {
            setLoggingIn(true);
            googlePromptAsync();
          }}
          appleSignIn={async (identityToken) => {
            setLoggingIn(true);
            await appleSignIn(identityToken);
          }}
          navigation={navigation}
          route={route}
        />
      )}
    </View>
  );
};

export default LaunchingPage;
