import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSetRecoilState } from "recoil";
// context
import { AxiosContext } from "../../context/AxiosContext";
// atoms
import carsAtom from "../../recoil/cars";
// components
import Screen from "../../components/Screen";
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
// stylesheet
import styles from "./RegisterCarStyles";
import { DefaultTheme } from "react-native-paper";
import popUpAlertAtom from "../../recoil/popUpAlert";

// --------------------------------------------------------------------------------

const carTypesData = [
  { label: "Sedan", value: "sedan" },
  { label: "Hatchback", value: "hatchback" },
  { label: "4x4", value: "4x4" },
];

// --------------------------------------------------------------------------------

const RegisterCar = ({ navigation }) => {
  const [manufacturersDropdownIsTriggered, triggerManufacturersDropdown] =
    useState(false);
  const [carTypeDropdownIsTriggered, triggerCarTypeDropdown] = useState(false);

  const [manufacturers, setManufacturers] = useState([]);
  const { authAxios } = useContext(AxiosContext);
  const setCarsData = useSetRecoilState(carsAtom);

  /* Non formik fields */
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedManufacturerHasError, setSelectedManufacturerHasError] =
    useState(false);

  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedCarTypeHasError, setSelectedCarTypeHasError] = useState(false);

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  /* Formik */

  const formik = useFormik({
    initialValues: {
      chassisNumber: "",
      plateNumber: "",
      carSubModel: "",
      carModelYear: "",
    },
    validationSchema: Yup.object().shape({
      plateNumber: Yup.string()
        .required("Plate number is required")
        .min(4, "Plate number cannot be less than 4 chars")

        .matches(
          /^(([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+)|([0-9]+ [A-Za-z]+)|([A-Za-z]+ [0-9]+))$|^(([\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+[٠-٩]+)|([٠-٩]+[\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+)|([٠-٩]+ [\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+)|([\u0621-\u064A]+[\u0621-\u064A ]*[\u0621-\u064A]+ [٠-٩]+))$/,
          "Plate number is not valid, e.g(xxx 111, x x x 222, ب ب ب ٢٢٢)"
        ),
      carSubModel: Yup.string().required("Car sub model is required"),
      carModelYear: Yup.number("Car model year must be a number")
        .required("Car model year is required")
        .min(1960, "Car model year cannot be less than 1960")
        .max(2022, "Car model year cannot be more than the current year"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const requestData = {
        chassisName: values.chassisNumber,
        plateNo: values.plateNumber,
        carType: selectedCarType.toString(),
        modelYear: values.carModelYear,
        manufacturer: selectedManufacturer.toString(),
        subModel: values.carSubModel,
      };

      await authAxios
        .post("car/add", requestData)
        .then(() => {
          resetForm();
          setSelectedManufacturer("");
          setSelectedCarType("");
          carsStateReloder();
          setPopUpAlert({
            visible: true,
            title: "Car added",
            body: "Car has been added successfully",
            popUpActionText: "done",
            popUpActionHandler: () => false,
          });
        })
        .catch((error) => {
          Alert.alert(
            "OPPS!",
            "Something wrong happened while trying to add car."
          );
          console.log("Error adding new car", error.response.data);
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

  const notFormFieldsValidator = () => {
    let proceed = true;
    if (selectedManufacturer === "") {
      proceed = false;
      setSelectedManufacturerHasError(true);
    }

    if (selectedCarType === "") {
      proceed = false;
      setSelectedCarTypeHasError(true);
    }

    return proceed;
  };

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

  const manufacturersFetcher = useCallback(async () => {
    await authAxios
      .get("/manufacturer/get")
      .then((response) => {
        const mappedData = response.data.result.data?.map((manufacturer) => ({
          label: manufacturer.name,
          value: manufacturer.id,
        }));
        setManufacturers(mappedData);
      })
      .catch((error) => {
        console.log("Error fetching manufacturers", error.response.data);
      });
  }, [authAxios, setManufacturers]);

  useEffect(() => {
    manufacturersFetcher();
  }, []);

  return (
    <Screen navigation={navigation}>
      {/* Wrapper */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Adding new car</Text>
          </View>
          {/* Form */}
          <ScrollView contentContainerStyle={styles.formWrapper}>
            {/* Chassis number */}
            <View style={styles.fieldWrapper}>
              <TextInput
                placeholder="Chassis number"
                value={values.chassisNumber}
                onChangeText={handleChange("chassisNumber")}
                onBlur={handleBlur("chassisNumber")}
                error={Boolean(touched.chassisNumber && errors.chassisNumber)}
                helperText={errors.chassisNumber}
                maxLength={17}
                onSubmitEditing={() => Keyboard.dismiss}
              />
            </View>
            {/* Plate number */}
            <View style={styles.fieldWrapper}>
              <TextInput
                placeholder="Plate number"
                onSubmitEditing={() => false}
                value={values.plateNumber}
                onChangeText={handleChange("plateNumber")}
                onBlur={handleBlur("plateNumber")}
                error={Boolean(touched.plateNumber && errors.plateNumber)}
                helperText={errors.plateNumber}
                maxLength={5}
                numberOfLines={1}
              />
            </View>
            {/* Manufacturer */}
            <View style={styles.fieldWrapper}>
              <DropDown
                mode="flat"
                label="Select manufacturer"
                visible={manufacturersDropdownIsTriggered}
                showDropDown={() => triggerManufacturersDropdown(true)}
                onDismiss={() => triggerManufacturersDropdown(false)}
                list={manufacturers}
                theme={{ ...DefaultTheme, roundness: 18 }}
                value={selectedManufacturer}
                setValue={setSelectedManufacturer}
                inputProps={{
                  style: styles.dropDownInput,
                  error: selectedManufacturerHasError,
                }}
              />
            </View>
            {/* Car type */}
            <View style={styles.fieldWrapper}>
              <DropDown
                mode="flat"
                label="Pick your car type"
                visible={carTypeDropdownIsTriggered}
                showDropDown={() => triggerCarTypeDropdown(true)}
                onDismiss={() => triggerCarTypeDropdown(false)}
                list={carTypesData}
                theme={{ ...DefaultTheme, roundness: 18 }}
                value={selectedCarType}
                setValue={setSelectedCarType}
                inputProps={{
                  style: styles.dropDownInput,
                  error: selectedCarTypeHasError,
                }}
              />
            </View>
            {/* Row fields */}
            <View style={styles.rowFields}>
              {/* Row field wrapper */}
              <View style={[styles.rowFieldWrapper, { marginRight: 13 }]}>
                <TextInput
                  placeholder="Car sub model"
                  value={values.carSubModel}
                  onChangeText={handleChange("carSubModel")}
                  onBlur={handleBlur("carSubModel")}
                  error={Boolean(touched.carSubModel && errors.carSubModel)}
                  helperText={errors.carSubModel}
                  maxLength={15}
                  blurOnSubmit
                />
              </View>
              {/* Row field wrapper */}
              <View style={styles.rowFieldWrapper}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Car model year"
                  value={values.carModelYear}
                  onChangeText={handleChange("carModelYear")}
                  onBlur={handleBlur("carModelYear")}
                  error={Boolean(touched.carModelYear && errors.carModelYear)}
                  helperText={errors.carModelYear}
                  maxLength={5}
                  numberOfLines={1}
                />
              </View>
            </View>
          </ScrollView>
          {/* Form submit */}
          <View style={styles.formSubmitWrapper}>
            <ActionButton
              title="CONFIRM"
              icon={false}
              disabled={actionButtonDisabler()}
              loading={isSubmitting}
              onPress={() => {
                if (notFormFieldsValidator()) {
                  handleSubmit();
                }
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

export default RegisterCar;
