import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { AxiosContext } from "../context/AxiosContext";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import popUpAlertAtom from "../recoil/popUpAlert";
import { useSetRecoilState } from "recoil";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleLogin() {
  const { publicAxios } = React.useContext(AxiosContext);
  const authContext = React.useContext(AuthContext);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "808627771301-nrughoq4vcicb00kspqsij3igs4c4v9d.apps.googleusercontent.com",
    androidClientId:
      "808627771301-miurp7eftmk9nvuebds9fh2nhh3jg7iv.apps.googleusercontent.com",
  });

  const signIn = React.useCallback(async (googleAccessToken) => {
    try {
      await publicAxios
        .get(`/user/auth/google?access_token=${googleAccessToken}`)
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
          console.log("google error", error);
          setPopUpAlert({
            visible: true,
            title: "Server error",
            body: "We are sorry, somthing wrong happened while trying to login using google.",
            popUpActionText: "okay",
            popUpActionHandler: () => false,
          });
        });
    } catch (error) {
      console.log("google logic error", error);
      setPopUpAlert({
        visible: true,
        title: "Cannot sign in with google",
        body: "We are sorry, you can't log in with google at the moment.",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    }
  }, []);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      signIn(authentication.accessToken);
    }
  }, [response, signIn]);

  const loading = !request;

  const prompt = async () => {
    await promptAsync();
  };

  return [loading, prompt];
}
