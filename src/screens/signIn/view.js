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
  Image,
  TouchableOpacity,
} from "react-native";
import createStyles from "./styles";
import CustomInput from "../../components/customInput";
import { Arrow } from "../../constants/svg";
import CustomText from "../../components/customText";
import TextBtn from "../../components/textBtn";
import { Colors } from "../../constants/colors";
import LogoImage from "../../components/logo";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../../recoil/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionButton from "../../components/ActionButton";
import { Logo } from "../../assets";
import signedWithAppleAtom from "../../recoil/signedWithApple";
import { AndroidBackHandler } from "react-navigation-backhandler";
import Icon from "react-native-vector-icons/Ionicons";
import popUpAlertAtom from "../../recoil/popUpAlert";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";

const SignInView = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const setSignedWithApple = useSetRecoilState(signedWithAppleAtom);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const styles = useMemo(() => createStyles(), []);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email address is required"),
      password: Yup.string().required("Password is required "),
    }),
    onSubmit: async (values) => {
      await publicAxios
        .post("/user/auth/signin", {
          email: values.email,
          password: values.password,
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
          setSignedWithApple(false);
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Error trying to log in", error.response.data);
          setPopUpAlert({
            visible: true,
            title: "Credientials error",
            body: "Wrong email or password",
            popUpActionText: "reset my password",
            popUpActionHandler: () => navigation.navigate("ForgetPassword"),
          });
        });
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    dirty,
    isSubmitting,
    handleSubmit,
    isValid,
  } = formik;
  const onLogin = async () => {};

  const actionButtonDisabler = () => {
    let disabled = false;

    if (isSubmitting) {
      disabled = true;
    }

    if (!dirty) {
      disabled = true;
    }

    if (!isValid) {
      disabled = true;
    }

    return disabled;
  };

  const backButtonHandler = useCallback(() => {
    navigation.navigate("LaunchingPage");
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, []);

  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      >
        {/* Header wrapper */}
        <View
          style={{
            alignItems: "center",
            height: 100,
            paddingTop: 30,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* back button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("LaunchingPage")}
          >
            <Icon name="arrow-back-outline" size={20} color={Colors.WHITE} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image source={Logo} />
          </View>
        </View>

        <CustomText text="Sign In" size={32} fontFamily="bold" />

        <CustomText text="Join our community" size={12} color="placeholder" />

        <View style={styles.emailInput}>
          <TextInput
            placeholder="Your Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={errors.email}
          />
        </View>

        <View>
          <TextInput
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={errors.password}
            defaultIcon={true}
            icon={{
              iconName: showPassword ? "eye" : "eye-off",
              iconColor: "#CDD4D9",
              onPress: () => {
                if (showPassword) {
                  setShowPassword(false);
                } else {
                  setShowPassword(true);
                }
              },
            }}
          />
        </View>

        <TextBtn
          text="Forgot your password?"
          textSize={8}
          textColor="placeholder"
          style={styles.forgetBtn}
          onPress={() => {
            navigation.navigate("ForgetPassword");
          }}
        />

        {/* <CustomText
          text={signInError}
          size={11}
          color="red"
          style={styles.error}
        /> */}

        {/* Action button wrapper */}

        <View style={{ marginTop: 120 }}>
          <ActionButton
            icon={false}
            title="LOG IN"
            disabled={actionButtonDisabler()}
            loading={isSubmitting}
            onPress={handleSubmit}
          />
        </View>

        <View style={styles.textWithButtonContainer}>
          <CustomText text="By signing up you agree to our " size={8} />

          <TextBtn
            text="Privacy Policy and Terms."
            textSize={8}
            onPress={() => navigation.navigate("TermsAndConditions")}
            textColor="white"
          />
        </View>
      </ScrollView>
    </AndroidBackHandler>
  );
};

export default SignInView;
