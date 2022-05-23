import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";

// store
import store from "./src/redux/store";
// context
import { AuthProvider } from "./src/context/AuthContext";
import { AxiosProvider } from "./src/context/AxiosContext";
//
import AppContainer from "./src";
import { useEffect } from "react";
import { Text, View, ToastAndroid, Platform, AlertIOS } from "react-native";

export default function App() {
  const [loaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }

  NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      notifyMessage(
        "Internet connection disabled, please enable your connection"
      );
    }
  });

  return (
    <>
      <Provider store={store}>
        <RecoilRoot>
          <AuthProvider>
            <AxiosProvider>
              <AppContainer />
            </AxiosProvider>
          </AuthProvider>
        </RecoilRoot>
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}
