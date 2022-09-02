import React, { FC, useMemo, useState, useContext, useCallback } from "react";
import {
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import CustomInput from "../../components/customInput";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";
import { AxiosContext } from "../../context/AxiosContext";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../../assets/images/logo.png";
import popUpAlertAtom from "../../recoil/popUpAlert";
import { useSetRecoilState } from "recoil";
import ActionButton from "../../components/ActionButton";

interface ForgetPasswordViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const ForgetPasswordView: FC<ForgetPasswordViewProps> = ({ navigation }) => {
  const [emailAdress, setEmailAderess] = useState("");
  const styles = useMemo(() => createStyles(), []);
  const { publicAxios } = useContext(AxiosContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);

  const setpopAlert: any = useSetRecoilState(popUpAlertAtom);

  const emailAddressValidator = useCallback(() => {
    const email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid;
    if (email.test(emailAdress)) {
      setEmailNotValid(false);
      valid = true;
    } else {
      valid = false;
      setEmailNotValid(true);
    }
    return valid;
  }, [emailAdress]);

  const handleSubmit = async () => {
    if (emailAddressValidator()) {
      setSubmitting(true);
      await publicAxios
        .post("/user/auth/resetPassword", { email: emailAdress })
        .then((response: any) => {
          navigation.navigate("SignIn");
          setpopAlert({
            visible: true,
            title: "Success",
            body: "Instructions has been sent to your email to reset your password.",
            popUpActionText: "okay",
            popUpActionHandler: () => false,
          });
        })
        .catch((error: any) => {
          console.log("resetting password", error);

          if (error.response.status === 400) {
            setpopAlert({
              visible: true,
              title: "Cannot reset your password",
              body: "We are sorry, your password cannot be resetted since you had signed in with gmail.",
              popUpActionText: "okay",
              popUpActionHandler: () => false,
            });
          } else {
            setpopAlert({
              visible: true,
              title: "Server error",
              body: "We are sorry something wrong happened.",
              popUpActionText: "okay",
              popUpActionHandler: () => false,
            });
          }
        });
      setSubmitting(false);
    } else {
      setEmailNotValid(true);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={styles.container}
      scrollEnabled={false}
      contentContainerStyle={styles.contentContainer}
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <CustomText text="Forgot password ?" size={32} fontFamily="bold" />

      <CustomText
        text={
          "Enter your email below and we will send you a" + "\n" + "reset email"
        }
        size={12}
        color="placeholder"
      />

      <CustomInput
        placeholder="Your Email Address"
        inputStyle={styles.input}
        value={emailAdress}
        onChangeText={(text) => setEmailAderess(text.trim())}
        containerStyle={styles.emailInput}
      />

      {emailNotValid && (
        <CustomText
          style={{ flex: 1, color: Colors.RED, marginBottom: 15 }}
          size={12}
          text="Please enter a valid email"
          color={Colors.RED}
        />
      )}

      <ActionButton
        icon={false}
        title="Submit"
        disabled={!emailAdress || isSubmitting}
        onPress={handleSubmit}
        loading={isSubmitting}
      />
    </ScrollView>
  );
};

export default ForgetPasswordView;
