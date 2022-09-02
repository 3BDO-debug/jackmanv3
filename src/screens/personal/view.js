import {
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { DatePickerModal } from "react-native-paper-dates";
import { useRecoilValue } from "recoil";
// atoms
import userLocationAtom from "../../recoil/userLocation";
// stylesheet
import styles from "./styles";
import { Colors } from "../../constants/colors";
import SignUpForm from "../../components/__personal/SignUpForm";
import moment from "moment";

// -------------------------------------------------------------------------

const PersonalView = ({ route, navigation }) => {
  const [datePickerIsTriggered, triggerDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const userLocation = useRecoilValue(userLocationAtom);

  const onDatePickerClosure = useCallback(() => {
    triggerDatePicker(false);
  }, [triggerDatePicker]);

  const onDatePickerConfirmation = useCallback(
    (params) => {
      const dateIsOutOfRange = moment(params.date).isAfter(
        "2004-01-01T01:00:00.000Z"
      );
      if (dateIsOutOfRange) {
        Alert.alert("Wrong date", "You can't be less than 18 years old.");
      } else {
        setSelectedDate(params.date);
        triggerDatePicker(false);
      }
    },
    [triggerDatePicker]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={Colors.WHITE} />
          </TouchableOpacity>
          {/* logo wrapper */}
          <View style={styles.logoWrapper}>
            <Image source={require("../../assets/images/logo.png")} />
          </View>
        </View>
        {/* Form title */}
        <View style={styles.formTitleWrapper}>
          <Text style={styles.formTitle}>Personal Information </Text>
        </View>
        {/* Form Wrapper */}
        <View style={styles.formWrapper}>
          <SignUpForm
            navigation={navigation}
            locationDetails={{
              cords: userLocation?.cords,
              locationName: userLocation?.locationName,
            }}
            triggerDatePicker={() => triggerDatePicker(true)}
            selectedDate={selectedDate}
          />
        </View>
        {/* Date picker */}
        <DatePickerModal
          locale="en"
          mode="single"
          label="Select date of birth"
          visible={datePickerIsTriggered}
          onConfirm={onDatePickerConfirmation}
          onDismiss={onDatePickerClosure}
          date={selectedDate}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PersonalView;
