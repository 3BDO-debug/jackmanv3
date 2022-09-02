import { ActivityIndicator, View } from "react-native";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRecoilState, useRecoilValue } from "recoil";
// drawer
import DrawerNavigation from "../drawer";
// atoms
import drawerAtom from "../recoil/drawerAtom";
// utils
import registerForPushNotificationsAsync from "../utils/registerForPushNotification";
//
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import authAtom from "../recoil/auth";
import updateUserInfoAtom from "../recoil/updateUserInfo";
import { Colors } from "../constants/colors";

// -------------------------------------------------------------------------------------------------------------------------------------

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// -------------------------------------------------------------------------------------------------------------------------------------

function AuthenticatedLayout() {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const updateUserInfo = useRecoilValue(updateUserInfoAtom);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);
  const [fetchingUserInfo, setFetchingUserInfo] = useState(false);
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  const userDataFetcher = useCallback(async () => {
    if (authContext.authState.authenticated === true) {
      await authAxios
        .get("/user/auth/get")
        .then((response) => {
          setAuth({ ...auth, userData: response.data.result.data });
        })
        .catch((error) => console.log("Error fetching user info", error));
    } else {
      setAuth({ authenticated: false });
    }
    setFetchingUserInfo(false);
  }, [authContext, setFetchingUserInfo]);

  const registerNotificationTokenRequest = useCallback(async (expoToken) => {
    await authAxios
      .post("/user/auth/setNotify", { token: expoToken })
      .then((response) => {
        console.log(
          "Registered notificaiton token successfully",
          response.data
        );
      })
      .catch((error) => {
        console.log("error registering notification token", error.response);
      });
  }, []);

  useEffect(() => {
    setFetchingUserInfo(true);
    userDataFetcher();
  }, [updateUserInfo, userDataFetcher]);

  /* Push notificaiton listener */

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        registerNotificationTokenRequest(token);
      })
      .catch((error) => {
        console.log("Error registering push notificaiton", error);
      });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          drawerStatus === "opened" ? Colors.DRAWER : Colors.BACKGROUND,
      }}
    >
      {fetchingUserInfo ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BACKGROUND,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.BUTTON} />
        </View>
      ) : (
        <DrawerNavigation />
      )}
    </View>
  );
}

export default AuthenticatedLayout;
