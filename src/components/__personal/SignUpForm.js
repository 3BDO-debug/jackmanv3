import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
// context
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
// atoms
import phoneTokenAtom from "../../recoil/phoneToken";
import popUpAlertAtom from "../../recoil/popUpAlert";
// components
import TextInput from "../TextInput";
import ActionButton from "../ActionButton";
// theme
import { Colors } from "../../constants/colors";

// -----------------------------------------------------------------------------------------------------------

const SignUpForm = (props) => {
  const { publicAxios } = useContext(AxiosContext);
  const [formattedDate, setFormattedDate] = useState("");
  const [dateOfBirthHasError, setDateOfBirthHasError] = useState(false);
  const [userLocationHasError, setUserLocationHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const phoneToken = useRecoilValue(phoneTokenAtom);
  const authContext = useContext(AuthContext);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      occupation: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .min(3)
        .max(32)
        .matches(
          /^[A-Za-z0-9]*[ ]?[A-Za-z]+[ ]?[A-Za-z0-9]*$/,
          "Name cannot contains special chars"
        ),
      email: Yup.string()
        .email("Email is not valid")
        .required("Please enter email address"),
      password: Yup.string()
        .min(8, "Password cannot be less than 8 chars")
        .max(30, "Password cannot be more than 32 chars")
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&-]).{8,30}/,
          "Password must be within [8-30] chars and mix of letters, numbers and special chars."
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const requestData = {
        email: values.email,
        password: values.password,
        name: values.name,
        phoneToken: phoneToken,
        latitude: props?.locationDetails?.cords?.latitude?.toString(),
        longitude: props?.locationDetails?.cords?.longitude?.toString(),
        locationName: props?.locationDetails?.locationName,
        birthDate: formattedDate,
        occupation: values.occupation || ".",
      };
      await publicAxios
        .post("/user/auth/signup", requestData)
        .then(() => {
          setPopUpAlert({
            visible: true,
            title: "Account created",
            body: "You account had been successfully created.",
            popUpActionText: "Go to log in",
            popUpActionHandler: () => props?.navigation.navigate("SignIn"),
            hasCustomDismissHandler: true,
            customDismissHandler: () =>
              props?.navigation.navigate("LaunchingPage"),
          });
        })
        .catch((error) => {
          if (error.response.data.responseCode === "USER_EXISTS") {
            setPopUpAlert({
              visible: true,
              title: "User exists",
              body: "We are sorry, user with this email already exists",
              popUpActionText: "okay",
              popUpActionHandler: () => false,
            });
          } else {
            setPopUpAlert({
              visible: true,
              title: "Something went wrong",
              body: "We are sorry, something wrong happened while trying to proceed your sign up request, please try again later.",
              popUpActionText: "understood",
              popUpActionHandler: () => false,
            });
          }
          console.log("error trying to sign up", error.response.data);
        });
    },
  });

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    handleSubmit,
    dirty,
    isSubmitting,
    touched,
  } = formik;

  const logInRequest = async (accessToken, refreshToken) => {
    authContext.setAuthState({
      accessToken: accessToken,
      refreshToken: refreshToken,
      authenticated: true,
    });
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    props?.navigation.navigate("Home");
  };

  const notFormFieldsValidator = () => {
    let proceed = true;
    if (!props?.locationDetails?.locationName) {
      proceed = false;
      setUserLocationHasError(true);
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Please set up your location first to be able to proceed.",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    }

    if (!formattedDate) {
      proceed = false;
      setDateOfBirthHasError(true);
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Please pick up your date of birth first.",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    }

    return proceed;
  };

  const actionButtonDisabler = useCallback(() => {
    let disabled = false;
    if (!dirty) {
      disabled = true;
    }

    if (userLocationHasError) {
      disabled = true;
    }

    if (dateOfBirthHasError) {
      disabled = true;
    }

    return disabled;
  }, [dirty]);

  useEffect(() => {
    if (props?.selectedDate) {
      const formattedDate = moment(props.selectedDate).format("M-D-YYYY");
      setFormattedDate(formattedDate);
    }
  }, [props.selectedDate]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
      <View style={styles.wrapper}>
        {/* Name */}
        <View style={styles.inputFieldWrapper}>
          <TextInput
            placeholder="Name"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={errors.name}
          />
        </View>
        {/* Email */}
        <View style={styles.inputFieldWrapper}>
          <TextInput
            placeholder="Email address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            helperText={errors.email}
          />
        </View>
        {/* Password */}
        <View style={styles.inputFieldWrapper}>
          <TextInput
            placeholder="Password"
            nativeID="password"
            secureTextEntry={showPassword}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
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
        {/* Location */}
        <View>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => props.navigation.navigate("LocationMap")}
          >
            <Text style={styles.locationInputText}>
              {props.locationDetails.locationName ||
                "Click to set up your locaiton"}
            </Text>
            <Icon
              name="location-outline"
              size={20}
              color={Colors.PLACEHOLDER}
            />
          </TouchableOpacity>
        </View>
        {/* Row input fields */}
        <View style={styles.rowInputFields}>
          {/* Date of birth */}
          <View style={{ flex: 1, marginRight: 15 }}>
            <TouchableOpacity
              style={styles.dateOfBirthInput}
              onPress={props.triggerDatePicker}
            >
              <Text style={styles.dateOfBirthInputText}>
                {formattedDate || "Date of birth"}
              </Text>
              <Icon
                name="calendar-outline"
                size={20}
                color={Colors.PLACEHOLDER}
              />
            </TouchableOpacity>
          </View>
          {/* Occupation */}
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Occupation"
              value={values.occupation}
              onChangeText={handleChange("occupation")}
              onBlur={handleBlur("occupation")}
            />
          </View>
        </View>
        {/* Submit button */}
        <View style={styles.submitButtonWrapper}>
          <ActionButton
            title="CONFIRM"
            icon={false}
            disabled={actionButtonDisabler() || isSubmitting}
            loading={isSubmitting}
            onPress={() => {
              if (notFormFieldsValidator()) {
                handleSubmit();
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  wrapper: {},
  inputFieldWrapper: {
    marginBottom: 20,
  },
  rowInputFields: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  locationInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "space-between",
  },
  locationInputText: {
    fontFamily: "Poppins-Regular",
    color: Colors.PLACEHOLDER,
    fontSize: 12,
    width: "80%",
  },
  dateOfBirthInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 18,
    backgroundColor: Colors.WHITE,
  },
  dateOfBirthInputText: {
    fontFamily: "Poppins-Regular",
    color: Colors.PLACEHOLDER,
    fontSize: 12,
    width: "80%",
  },
  submitButtonWrapper: {
    marginVertical: 70,
  },
});
