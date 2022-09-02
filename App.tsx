import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/en";
import Constants from "expo-constants";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { I18nManager, View } from "react-native";
// context
import { AuthProvider } from "./src/context/AuthContext";
import { AxiosProvider } from "./src/context/AxiosContext";
//
import AppContainer from "./src/components/AppContainer";
import { Colors } from "./src/constants/colors";
import PopUpAlert from "./src/components/PopUpAlert";

// ------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------

registerTranslation("en-GB", enGB);

Constants.manifest!.originalFullName = "@code-hustle/Jackman";

const reactNativePaperTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.BUTTON,
    accent: Colors.PLACEHOLDER,
    error: "#E4646F",
  },
};

// ------------------------------------------------------------------------------------------------------

export default function App() {
  const [loaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Cairo-Bold": require("./assets/fonts/Cairo-Bold.ttf"),
    "Cairo-Regular": require("./assets/fonts/Cairo-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  return (
    <AuthProvider>
      <AxiosProvider>
        <RecoilRoot>
          <SafeAreaProvider>
            <PaperProvider theme={reactNativePaperTheme}>
              <AppContainer />
              <StatusBar style="light" />
              <PopUpAlert />
            </PaperProvider>
          </SafeAreaProvider>
        </RecoilRoot>
      </AxiosProvider>
    </AuthProvider>
  );
}
