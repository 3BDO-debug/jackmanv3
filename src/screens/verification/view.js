import React, { useContext, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import createStyles from "./styles";
import CustomInput from "../../components/customInput";
import { Logo } from "../../constants/svg";
import CustomText from "../../components/customText";
import { AxiosContext } from "../../context/AxiosContext";
import { Colors } from "../../constants/colors";
import { useSetRecoilState } from "recoil";
import phoneTokenAtom from "../../recoil/phoneToken";
import Icon from "react-native-vector-icons/Ionicons";

const VerificationView = ({ route, navigation }) => {
  const styles = useMemo(() => createStyles(), []);

  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [token, setToken] = useState("");

  const [otpError, setOtpError] = useState("");

  const { publicAxios } = useContext(AxiosContext);
  const [verifying, setVerifying] = useState(false);

  const setPhoneToken = useSetRecoilState(phoneTokenAtom);

  const verifyOTPRequest = async (otpCode) => {
    setVerifying(true);
    await publicAxios
      .post("/user/auth/verifyotp", {
        id: route.params.codeId.toString(),
        otpCode: otpCode,
      })
      .then((response) => {
        setPhoneToken(response.data.phoneToken);
        navigation.navigate("Personal");
      })
      .catch((error) => {
        console.log("OTP verification error", error.response.data);
        if (error.response.status === 400) {
          Alert.alert("OTP invalid", "You have entered invalid OTP.");
        } else {
          Alert.alert(
            "Error occured",
            "Something wrong happened verifying the OTP."
          );
        }
      });
    setVerifying(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={styles.container}
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
      <CustomText text="Verify your account" size={30} fontFamily="bold" />

      <CustomText
        text="Enter the 4 digits number, sent via SMS"
        size={12}
        color="placeholder"
      />

      {verifying ? (
        <View style={{ flex: 1, marginTop: 50 }}>
          <ActivityIndicator size="large" color={Colors.BUTTON} />
        </View>
      ) : (
        <View style={styles.verifyInputView}>
          <CustomInput
            inputRef={input1}
            value={num1}
            keyboardType="number-pad"
            containerStyle={styles.textInput}
            inputStyle={styles.input}
            fontFamily="bold"
            maxLength={1}
            autoFocus={true}
            onChangeText={(text) => {
              setNum1(text);
              if (text != "") {
                input2.current?.focus();
              }
            }}
          />

          <CustomInput
            inputRef={input2}
            value={num2}
            keyboardType="number-pad"
            containerStyle={styles.textInput}
            inputStyle={styles.input}
            fontFamily="bold"
            maxLength={1}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && num2 == "") {
                setNum1("");
                input1.current?.focus();
              }
            }}
            onChangeText={(text) => {
              setNum2(text);
              if (text != "") {
                input3.current?.focus();
              } else input1.current?.focus();
            }}
          />

          <CustomInput
            inputRef={input3}
            value={num3}
            keyboardType="number-pad"
            containerStyle={styles.textInput}
            inputStyle={styles.input}
            fontFamily="bold"
            maxLength={1}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && num3 == "") {
                setNum2("");
                input2.current?.focus();
              }
            }}
            onChangeText={(text) => {
              setNum3(text);
              if (text != "") {
                input4.current?.focus();
              } else input2.current?.focus();
            }}
          />

          <CustomInput
            inputRef={input4}
            value={num4}
            keyboardType="number-pad"
            containerStyle={styles.textInput}
            inputStyle={styles.input}
            fontFamily="bold"
            maxLength={1}
            returnKeyType="go"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && num4 == "") {
                setNum3("");
                input3.current?.focus();
              }
            }}
            onChangeText={(text) => {
              setNum4(text);
              if (text == "") input3.current?.focus();
              else {
                let token = `${num1}${num2}${num3}${text}`;
                setToken(token);
                if (token.length == 4) {
                  verifyOTPRequest(`${num1}${num2}${num3}${text}`);
                }
              }
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default VerificationView;
