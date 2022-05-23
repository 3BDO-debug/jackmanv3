import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { AxiosContext } from "../context/AxiosContext";
import * as Keychain from "react-native-keychain";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleLogin() {
  const { publicAxios } = React.useContext(AxiosContext);
  const authContext = React.useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "808627771301-nrughoq4vcicb00kspqsij3igs4c4v9d.apps.googleusercontent.com",
    androidClientId:
      "808627771301-miurp7eftmk9nvuebds9fh2nhh3jg7iv.apps.googleusercontent.com",
  });

  React.useEffect(async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      try {
        await publicAxios
          .get(`/user/auth/google?access_token=${authentication.accessToken}`)
          .then(async (response) => {
            console.log("husslteee", response.data);
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
            console.log("google error", error);
            Alert.alert(
              "Error",
              "Something wrong happened trying to process your request."
            );
          });
      } catch (error) {
        console.log("google logic error", error);
        Alert.alert(
          "Error authenticating with google",
          "Somthing wring happened please try another method"
        );
      }
    }
  }, [response]);

  const loading = !request;

  const prompt = () => {
    promptAsync();
  };

  return [loading, prompt];
}
