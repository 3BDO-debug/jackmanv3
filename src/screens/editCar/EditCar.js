import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import { DefaultTheme } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
// context
import { AxiosContext } from "../../context/AxiosContext";
// atoms
import carsAtom from "../../recoil/cars";
import popUpAlertAtom from "../../recoil/popUpAlert";
// Stylesheet
import styles from "./EditCarStyles";
// components
import Screen from "../../components/Screen";
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
import { Colors } from "../../constants/colors";

// -----------------------------------------------------------------------------------------------------------

const carTypesData = [
  { label: "Sedane", value: "sedan" },
  { label: "Hatch bag", value: "hatchback" },
  { label: "Four by four", value: "4x4" },
];

// -----------------------------------------------------------------------------------------------------------

const EditCar = ({ route, navigation }) => {
  const [manufacturersDropdownIsTriggered, triggerManufacturersDropdown] =
    useState(false);
  const [carTypeDropdownIsTriggered, triggerCarTypeDropdown] = useState(false);
  const [fetchingCarData, setFetchingCarData] = useState(false);
  const [manufacturers, setManufacturers] = useState([]);
  const { authAxios } = useContext(AxiosContext);
  const setCarsData = useSetRecoilState(carsAtom);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  /* Non form fields */
  const [manufacturer, setManufacturer] = useState(null);
  const [carType, setCarType] = useState(null);

  const formik = useFormik({
    initialValues: {
      chassisName: "",
      plateNo: "",
      manufacturer: "",
      carType: "",
      subModel: "",
      modelYear: "",
    },
    validationSchema: Yup.object().shape({
      plateNo: Yup.string()
        .required("Plate number is required")
        .min(4, "Plate number cannot be less than 4 chars")
        .max(
          11,
          "Plate number cannot be more than 11 chars *spaces are calculated."
        )
        .matches(
          /^(([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+)|([0-9]+ [A-Za-z]+)|([A-Za-z]+ [0-9]+))$|^(([\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+[٠-٩]+)|([٠-٩]+[\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+)|([٠-٩]+ [\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+)|([\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+ [٠-٩]+))$/,
          "Plate number is not valid, e.g(xxx 111, x x x 222, ب ب ب 222)"
        ),
      subModel: Yup.string().required("Car sub model is required"),
      modelYear: Yup.number("Car model year must be a number")
        .required("Car model year is required")
        .min(1960, "Car model year cannot be less than 1960")
        .max(2022, "Car model year cannot be more than the current year"),
      carType: Yup.string().required("Car type is required"),
      manufacturer: Yup.number().required("Car manufacturer is required"),
    }),
    onSubmit: async (values) => {
      const requestData = { ...values };
      requestData.manufacturer = requestData.manufacturer.toString();
      requestData.modelYear = requestData.modelYear.toString();
      await authAxios
        .patch("/car/updateMyCar", requestData)
        .then(() => {
          carsStateReloder();
          setPopUpAlert({
            visible: true,
            title: "Updated successfully",
            body: "Car info had been updated successfully!",
            popUpActionText: "Okay",
            popUpActionHandler: () => false,
          });
        })
        .catch((error) => {
          setPopUpAlert({
            visible: true,
            title: "Server error",
            body: "We are sorry, something wrong happened trying to update car info.",
            popUpActionText: "Okay",
            popUpActionHandler: () => false,
          });
          console.log("Error updating car data", error.response.data);
        });
    },
  });

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    isValid,
    dirty,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  const carsStateReloder = useCallback(async () => {
    await authAxios
      .get("/car/myCars?page=1&limit=100")
      .then((response) => {
        setCarsData(response.data.result.data);
      })
      .catch((error) => {
        console.log("Error refreshing cars data", error.response.data);
      });
  }, []);

  const fetchCarData = useCallback(() => {
    const carData = route?.params?.carData;
    const carDataFields = Object.keys(carData);
    carDataFields.map((carDataField) => {
      if (carDataField !== "reserved") {
        if (carDataField === "manufacturer") {
          setFieldValue(carDataField, carData[carDataField].id);
        } else if (carDataField === "modelYear") {
          setFieldValue(carDataField, parseInt(carData[carDataField], 10));
        } else {
          setFieldValue(carDataField, carData[carDataField]?.toString());
        }
      }
    });
  }, [route?.params?.carData, setFetchingCarData, setFieldValue]);

  const fetchManufacturers = useCallback(async () => {
    await authAxios
      .get("/manufacturer/get")
      .then((response) => {
        const mappedManufacturers = response.data.result.data?.map(
          (manufacturer) => ({
            label: manufacturer.name,
            value: manufacturer.id,
          })
        );
        setManufacturers(mappedManufacturers);
      })
      .catch((error) => {
        console.log("Error fetching manufacturers", error.response);
      });
  }, []);

  useEffect(() => {
    setFetchingCarData(true);
    fetchManufacturers();
    fetchCarData();
    setFetchingCarData(false);
  }, [route?.params?.carData, setFetchingCarData]);

  useEffect(() => {
    if (manufacturer) {
      setFieldValue("manufacturer", manufacturer);
    }
  }, [manufacturer]);

  useEffect(() => {
    if (carType) {
      setFieldValue("carType", carType?.toString());
    }
  }, [carType]);

  return (
    <Screen navigation={navigation}>
      <View style={styles.wrapper}>
        {/* Title wrapper */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Car Details</Text>
        </View>
        {/* Form wrapper */}
        {fetchingCarData ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <ActivityIndicator size="large" color={Colors.BUTTON} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.formWrapper}>
            {/* Chassis number */}
            <View style={styles.fieldWrapper}>
              <TextInput
                value={values.chassisName}
                onChangeText={handleChange("chassisName")}
                onBlur={handleBlur("chassisName")}
                placeholder="Chassis number"
                error={Boolean(touched.chassisName && errors.chassisName)}
                helperText={errors.chassisName}
                maxLength={17}
              />
            </View>
            {/* Plate number */}
            <View style={styles.fieldWrapper}>
              <TextInput
                value={values.plateNo}
                onChangeText={handleChange("plateNo")}
                onBlur={handleBlur("platNo")}
                placeholder="Plate number"
                error={Boolean(touched.plateNo && errors.plateNo)}
                helperText={errors.plateNo}
                maxLength={5}
              />
            </View>
            {/* Manufacturer */}
            <View style={styles.fieldWrapper}>
              <DropDown
                mode="flat"
                label="Select manufacturer"
                value={values.manufacturer}
                setValue={setManufacturer}
                visible={manufacturersDropdownIsTriggered}
                showDropDown={() => triggerManufacturersDropdown(true)}
                onDismiss={() => triggerManufacturersDropdown(false)}
                list={manufacturers}
                theme={{ ...DefaultTheme, roundness: 18 }}
                inputProps={{
                  style: styles.dropDownInput,
                  error: Boolean(touched.manufacturer && errors.manufacturer),
                }}
              />
            </View>
            {/* Car type */}
            <View style={styles.fieldWrapper}>
              <DropDown
                mode="flat"
                label="Pick your car type "
                value={values.carType}
                setValue={setCarType}
                visible={carTypeDropdownIsTriggered}
                showDropDown={() => triggerCarTypeDropdown(true)}
                onDismiss={() => triggerCarTypeDropdown(false)}
                list={carTypesData}
                theme={{ ...DefaultTheme, roundness: 18 }}
                inputProps={{
                  style: styles.dropDownInput,
                  error: Boolean(touched.carType && errors.carType),
                }}
              />
            </View>

            {/* Row fields */}
            <View style={styles.rowFields}>
              {/* Row field wrapper */}
              <View style={[styles.rowFieldWrapper, { marginRight: 13 }]}>
                <TextInput
                  value={values.subModel}
                  onChangeText={handleChange("subModel")}
                  onBlur={handleBlur("subModel")}
                  placeholder="Car sub model"
                  error={Boolean(touched.subModel && errors.subModel)}
                  helperText={errors.subModel}
                  maxLength={15}
                />
              </View>
              {/* Row field wrapper */}
              <View style={styles.rowFieldWrapper}>
                <TextInput
                  keyboardType="numeric"
                  value={values.modelYear.toString()}
                  placeholder="Car model year"
                  onChangeText={handleChange("modelYear")}
                  onBlur={handleBlur("modelYear")}
                  error={Boolean(touched.modelYear && errors.modelYear)}
                  helperText={errors.modelYear}
                  maxLength={5}
                />
              </View>
            </View>
          </ScrollView>
        )}
        {/* Form submit */}
        <View style={styles.formSubmitWrapper}>
          <ActionButton
            title="UPDATE"
            icon={false}
            loading={isSubmitting}
            disabled={!dirty || isSubmitting}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Screen>
  );
};

export default EditCar;
