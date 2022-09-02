import React, { createContext, useState } from "react";
import { useResetRecoilState } from "recoil";
import authAtom from "../recoil/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const resetAuth = useResetRecoilState(authAtom);

  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("accessToken");
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
    resetAuth();
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
