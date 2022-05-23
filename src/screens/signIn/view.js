import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import axios from "axios";
import {
  BackHandler,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import createStyles from "./styles";
import CustomInput from "../../components/customInput";
import { Arrow } from "../../constants/svg";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import TextBtn from "../../components/textBtn";
import { Colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE_ERROR } from "../../redux/actionTypes";
import LogoImage from "../../components/logo";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
import * as Keychain from "react-native-keychain";
import { useRecoilState } from "recoil";
import authAtom from "../../recoil/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInView = ({ navigation }) => {
  const state = useSelector((state) => state.MainState);
  const messageError = state.messageError;

  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const styles = useMemo(() => createStyles(), []);

  useEffect(() => {
    if (messageError != "") setSignInError(messageError);
  }, [messageError]);

  const backAction = useCallback(() => {
    dispatch({
      type: CLEAR_MESSAGE_ERROR,
    });
    navigation.goBack();

    return true;
  }, []);

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => handler.remove();
  }, [backAction]);

  const onLogin = async () => {
    setSubmitting(true);
    await publicAxios
      .post("/user/auth/signin", {
        email: email,
        password: password,
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
        navigation.navigate("Drawer");
      })
      .catch((error) => Alert.alert(error.response.data.message));
    setSubmitting(false);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
    >
      <LogoImage />

      <CustomText text="Sign In" size={32} fontFamily="bold" />

      <CustomText text="Join our community" size={12} color="placeholder" />

      <CustomInput
        placeholder="Your Email"
        inputStyle={styles.input}
        containerStyle={styles.emailInput}
        value={email}
        onChangeText={(text) => {
          setEmail(text.trim());
        }}
      />

      <CustomInput
        password={true}
        placeholder="Password"
        inputStyle={styles.input}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />

      <TextBtn
        text="Forgot your password?"
        textSize={8}
        textColor="placeholder"
        style={styles.forgetBtn}
        onPress={() => {
          navigation.navigate("ForgetPassword");
        }}
      />

      <CustomText
        text={signInError}
        size={11}
        color="red"
        style={styles.error}
      />

      {isSubmitting ? (
        <ActivityIndicator
          style={styles.loginBtn}
          size="large"
          color={Colors.BUTTON}
        />
      ) : (
        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={[
            styles.loginBtn,
            {
              backgroundColor:
                email == "" || password == "" ? Colors.GRAY : Colors.BUTTON,
            },
          ]}
          text="LOG IN"
          textSize={16}
          onPress={() => onLogin()}
          disabled={email == "" || password == ""}
        />
      )}

      <View style={styles.textWithButtonContainer}>
        <CustomText text="By signing up you agree to our " size={8} />

        <TextBtn
          text="Privacy Policy and Terms."
          textSize={8}
          textColor="white"
        />
      </View>
    </ScrollView>
  );
};

export default SignInView;
