import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
// context
import { AuthContext } from "../context/AuthContext";
// styles
import { Colors } from "../constants/colors";
// layouts
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import NotAuthenticatedLayout from "../layouts/NotAuthenticatedLayout";
// components
import WaitingForConnection from "./WaitingForConnection";

// --------------------------------------------------------------------------------------------------------------------------------------------

function AppContainer() {
  const authContext = useContext(AuthContext);
  const [authLayout, setIsAuthLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingJWT, setIsLoadingJWT] = useState(true);
  const [mounted, setIsMounted] = useState(false);
  const netInfo = useNetInfo();

  const loadJWT = async () => {
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
    setIsLoadingJWT(false);
  };

  const renderLayout = useCallback(() => {
    let context;
    if (authLayout) {
      context = <AuthenticatedLayout />;
    } else {
      context = <NotAuthenticatedLayout />;
    }

    return context;
  }, [authLayout]);

  const contextConditions = useCallback(() => {
    let renderResult;
    if (netInfo.isConnected) {
      if (loading) {
        renderResult = (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.BACKGROUND,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Colors.BUTTON} />
          </View>
        );
      } else {
        renderResult = (
          <NavigationContainer>{renderLayout()}</NavigationContainer>
        );
      }
    } else if (mounted && netInfo.isConnected === false) {
      renderResult = <WaitingForConnection />;
    } else {
      renderResult = (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BACKGROUND,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.BUTTON} />
        </View>
      );
    }

    return renderResult;
  }, [mounted, netInfo, loading, renderLayout]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadJWT();
  }, []);

  useEffect(() => {
    if (!loadingJWT) {
      if (authContext.authState.authenticated) {
        setIsAuthLayout(true);
      } else {
        setIsAuthLayout(false);
      }
      setLoading(false);
    }
  }, [authContext, loadingJWT, setLoading, setIsAuthLayout]);

  return <>{contextConditions()}</>;
}

export default AppContainer;
