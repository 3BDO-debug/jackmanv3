import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useContext,
} from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import createStyles from "./styles";
import CustomInput from "../../components/customInput";
import { Arrow, Facebook, Google } from "../../constants/svg";
import { EGYPT, Logo } from "../../assets";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import TextBtn from "../../components/textBtn";
import { Colors } from "../../constants/colors";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { AxiosContext } from "../../context/AxiosContext";
import ActionButton from "../../components/ActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import * as AppleAuthentication from "expo-apple-authentication";
import { AuthContext } from "../../context/AuthContext";
import { useSetRecoilState } from "recoil";
import signedWithAppleAtom from "../../recoil/signedWithApple";

const LaunchingPageView = ({
  route,
  navigation,
  signGoogle,
  singFacebook,
  appleSignIn,
}) => {
  const [phone, setPhone] = useState("");
  const [phoneErrorCaption, setPhoneErrorCaption] = useState("");
  const { publicAxios } = useContext(AxiosContext);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [termsAndConditionsAgreed, setTermsAndConditionsAgreed] =
    useState(false);
  const authContext = useContext(AuthContext);

  const styles = useMemo(() => createStyles(), []);
  const setSignedWithApple = useSetRecoilState(signedWithAppleAtom);

  const backButtonHandler = useCallback(() => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     */

    if (route.name === "LaunchingPage") {
      Alert.alert("Attention", "Do you want to exit the app ?", [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => false },
      ]);
      return true;
    }

    return false;
  }, [route.name]);

  const termsAndConditionsAgreeChecker = useCallback(async () => {
    const termsAndConditionsAgreed = await AsyncStorage.getItem(
      "termsAndConditionsAgreed"
    );
    setTermsAndConditionsAgreed(Boolean(termsAndConditionsAgreed));
    return Boolean(termsAndConditionsAgreed);
  }, [AsyncStorage]);

  const actionNavigator = async (callback) => {
    if ((await termsAndConditionsAgreeChecker()) === true) {
      callback();
    } else {
      Alert.alert(
        "Terms and conditions",
        "In order to proceed you have to agree to our terms and conditions first",
        [
          {
            text: "Terms and Conditions",
            onPress: () =>
              navigation.navigate("TermsAndConditions", {
                callbackFunction: callback,
              }),
          },
        ]
      );
    }
  };

  const signInRequest = useCallback(async () => {
    await publicAxios
      .post("/user/auth/signin", {
        email: "otaher@gmail.com",
        password: "@@AA33ee",
      })
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
        navigation.navigate("Home");
      })
      .catch((error) => Alert.alert(error.response.data.message));
  }, [publicAxios, authContext, AsyncStorage, navigation]);

  const sendOTPRequest = useCallback(async (phoneNumber) => {
    setSendingOTP(true);
    await publicAxios
      .post("/user/auth/verify", { phoneNumber: phoneNumber })
      .then((response) => {
        console.log("response", response.data);

        navigation.navigate("Verification", { codeId: response.data.otp.id });
      })
      .catch((error) => {
        console.log("Error sending otp to phone number", error);
        if (error.response.data.responseCode === "PHONE_NUMBER_EXISTS") {
          Alert.alert(
            "Phone number exists",
            "This phone number has already been used before"
          );
        } else if (error.response.data.responseCode === "MESSAGE_TIME_LIMIT") {
          Alert.alert("Try again later", "You have exceeded your limit.");
        } else {
          console.log("Error with sending OTP", error.response.data);
          Alert.alert(
            "Error",
            "Something wrong happened while verifying your phone number"
          );
        }
      });
    setSendingOTP(false);
  }, []);

  useEffect(() => {
    termsAndConditionsAgreeChecker();
  }, [AsyncStorage.getItem("termsAndConditionsAgreed")]);

  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header wrapper */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            paddingTop: 30,
            marginBottom: 30,
          }}
        >
          <Image source={Logo} />
        </View>

        <CustomText text="Enter Phone Number" size={15} fontFamily="medium" />

        <View style={styles.phoneContainer}>
          <View style={styles.flagContainer}>
            <Image source={EGYPT} style={styles.flag} />
          </View>
          <CustomInput
            required={true}
            containerStyle={styles.phoneInputContainer}
            placeholder="Enter your phone number"
            inputStyle={styles.input}
            keyboardType="phone-pad"
            caption={phoneErrorCaption}
            error={phoneErrorCaption != ""}
            maxLength={phone[0] == "0" ? 11 : 10}
            onChangeText={(text) => {
              setPhone(text);
            }}
            leftIcon={
              <View style={{ marginLeft: -23 }}>
                <CustomText
                  text="+20"
                  color="black"
                  size={16}
                  fontFamily="medium"
                />
              </View>
            }
          />
        </View>

        <CustomText text="Create an account" size={32} fontFamily="bold" />

        <CustomText text="Join our community " size={12} color="placeholder" />

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              actionNavigator(singFacebook);
            }}
          >
            <Icon name="facebook-square" size={35} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              actionNavigator(signGoogle);
            }}
          >
            <Icon name="google" size={35} color={Colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon size={35} name="apple1" color={Colors.WHITE} />
          </TouchableOpacity>
        </View> */}

        <CustomButton
          leftIcon={<Google />}
          leftIconContainerStyle={styles.socialBtnIcon}
          containerStyle={[styles.googleBtn, styles.socialBtn]}
          text="Continue with Google"
          textSize={16}
          textColor="text1"
          textFontFamily="regular"
          onPress={() => {
            actionNavigator(signGoogle);
          }}
        />

        <CustomButton
          leftIcon={<Facebook />}
          leftIconContainerStyle={styles.socialBtnIcon}
          containerStyle={styles.socialBtn}
          text="Continue with Facebook"
          textSize={16}
          textColor="text1"
          textFontFamily="regular"
          onPress={() => {
            actionNavigator(singFacebook);
          }}
        />

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={20}
          style={{
            width: "100%",
            height: 50,
            marginTop: 20,
          }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });

              await appleSignIn(credential?.identityToken);

              // signed in
            } catch (e) {
              if (e.code === "ERR_CANCELED") {
                // handle that the user canceled the sign-in flow
                Alert.alert(
                  "Login cancelled",
                  "You have cancelled the login process"
                );
              } else {
                // handle other errors
                Alert.alert(
                  "Error",
                  "Something wrong happened while trying to login."
                );
              }
            }
          }}
        />

        <View style={styles.textWithButtonContainer}>
          <CustomText
            text="Already have an account? "
            size={11}
            fontFamily="bold"
          />

          <TextBtn
            text="Sign In"
            textSize={11}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>

        {/* Action button wrapper */}

        <View style={{ paddingVertical: 20 }}>
          <ActionButton
            icon={false}
            disabled={sendingOTP || phone === ""}
            title="LOG IN"
            loading={sendingOTP}
            onPress={() => {
              actionNavigator(() => {
                let validPhone = phone[0] != "0" ? "+20" + phone : "+2" + phone;
                if (/^\+201[0-5]+[0-9]+$/.test(validPhone)) {
                  sendOTPRequest(validPhone);
                  setPhoneErrorCaption("");
                } else
                  setPhoneErrorCaption("* Please enter a valid phone number");
              });
            }}
          />
        </View>

        <View style={styles.textWithButtonContainer}>
          <CustomText text="By signing up you agree to our " size={8} />

          <TextBtn
            text="Privacy Policy and Terms."
            textSize={8}
            textColor="white"
            onPress={() => navigation.navigate("TermsAndConditions")}
          />
        </View>
      </ScrollView>
    </AndroidBackHandler>
  );
};

export default LaunchingPageView;
