import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Icon from "react-native-vector-icons/Ionicons";
// atoms
import authAtom from "../../recoil/auth";
import userLocationAtom from "../../recoil/userLocation";
import popUpAlertAtom from "../../recoil/popUpAlert";
// stylesheets
import styles from "./AdditionalInformationStyles";
// components
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
import bookingAtom from "../../recoil/booking";
import phoneNumberValidator from "../../utils/phoneNumberValidator";

// ----------------------------------------------------------------

const AdditionalInformation = ({ setStep, navigation }) => {
  const userData = useRecoilValue(authAtom)?.userData;
  const [userLocation, setUserLocation] = useRecoilState(userLocationAtom);
  const [booking, setBooking] = useRecoilState(bookingAtom);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      mileage: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Name cannot be less than 3 chars")
        .max(32, "Name cannot be more than 32 chars")
        .required("Name is required")
        .matches(
          /^[A-Za-z0-9]*[ ]?[A-Za-z]+[ ]?[A-Za-z0-9]*$/,
          "Name cannot contain special chars"
        ),
      phoneNumber: Yup.string("Phone number cannot be empty")
        .nullable(true, "Phone number cannot be empty")
        .required("Phone is required")
        .max(15, "Phone number is too long"),

      mileage: Yup.string("Mileage should be a number")
        .nullable(true, "Milleage cannot be empty")
        .min(1, "Mileage cannot be less than 1")
        .required("Mileage is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (!userData?.locationName && Boolean(userLocation) === false) {
        setPopUpAlert({
          visible: true,
          title: "Validation error",
          body: "Please set up your locaiton first to be able to proceed.",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
        setSubmitting(false);
      } else if (!phoneNumberValidator(values.phoneNumber)) {
        setPopUpAlert({
          visible: true,
          title: "Validation error",
          body: "Phone number is not valid (Only english numbers is allowed)",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
        setSubmitting(false);
      } else {
        setBooking({
          ...booking,
          name: values.name,
          phoneNumber: values.phoneNumber,
          longitude: userLocation?.cords?.longitude || userData?.longitude,
          latitude: userLocation?.cords?.latitude || userData?.latitude,
          locationName: userLocation?.locationName || userData?.locationName,
        });
        setUserLocation(null);
        setStep(3);
      }
    },
  });

  const {
    setFieldValue,
    values,
    handleChange,
    handleBlur,
    dirty,
    isValid,
    isSubmitting,
    handleSubmit,
    touched,
    errors,
  } = formik;

  const actionButtonDisabler = () => {
    let disabled = false;

    if (!dirty) {
      disabled = true;
    }

    if (!isValid) {
      disabled = true;
    }

    return disabled;
  };

  useEffect(() => {
    if (userData) {
      setFieldValue("name", userData.name);
      setFieldValue("phoneNumber", userData.phoneNumber);
    }
  }, [userData]);

  return (
    <View style={styles.wrapper}>
      {/* Title */}
      <Text style={styles.title}>Additional Information</Text>
      {/* Form wrapper */}
      <ScrollView contentContainerStyle={styles.formWrapper}>
        {/* User name */}
        <View style={styles.fieldWrapper}>
          <TextInput
            placeholder="Name"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={errors.name}
            numberOfLines={1}
            maxLength={32}
          />
        </View>
        {/* Phone number */}
        <View style={styles.fieldWrapper}>
          <TextInput
            placeholder="Phone number"
            keyboardType="numeric"
            value={values.phoneNumber}
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={errors.phoneNumber}
            numberOfLines={1}
            maxLength={15}
          />
        </View>
        {/* Mileage */}
        <View style={styles.fieldWrapper}>
          <TextInput
            placeholder="Mileage"
            keyboardType="numeric"
            value={values.mileage}
            onChangeText={handleChange("mileage")}
            onBlur={handleBlur("mileage")}
            error={Boolean(touched.mileage && errors.mileage)}
            helperText={errors.mileage}
            numberOfLines={1}
          />
        </View>
        {/* Location */}
        <TouchableOpacity
          style={styles.locationInputWrapper}
          onPress={() => navigation.navigate("LocationMap")}
        >
          {/* Value */}
          <Text style={styles.locationInputValue}>
            {userLocation?.locationName ||
              userData?.locationName ||
              "Please set up your location"}
          </Text>
          {/* Icon wrapper */}
          <Icon name="location-outline" size={20} />
        </TouchableOpacity>
      </ScrollView>
      {/* Action button */}
      <View style={styles.actionButtonWrapper}>
        <ActionButton
          icon={false}
          disabled={actionButtonDisabler()}
          title="Continue"
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default AdditionalInformation;
