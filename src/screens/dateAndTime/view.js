import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Alert, Platform } from "react-native";
import createStyles from "./styles";
import { Arrow } from "../../constants/svg";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRecoilState, useSetRecoilState } from "recoil";
import bookingAtom from "../../recoil/booking";

const DateView = ({
  navigation,
  onPress,
  selectedDate,

  dateSelected,
  timeSelected,
}) => {
  const styles = useMemo(() => createStyles(), []);

  const [closedDates, setClosedDates] = useState();

  const [numberOfSelectedDates, setNumberOfSelectedDates] = useState(0);
  const setCurrentSelectedDate = useState(new Date())[1];
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentSelectedTime, setCurrentSelectedTime] = useState(
    new Date(Date.now())
  );

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [numberOfTriggeredDateSelection, setNumberOfTriggeredDateSelection] =
    useState(0);

  // Recoil
  const [booking, setBooking] = useRecoilState(bookingAtom);

  const onDateChange = useCallback(
    (date) => {
      if (selectedDates.length >= 3) {
        Alert.alert(
          "OPPPS!!",
          "You already had selected three dates either reset your selection or press continue."
        );
      } else {
        setSelectedDates([
          ...selectedDates,
          { selectedDate: date, time: new Date(Date.now()) },
        ]);
        setCurrentSelectedDate(date);
        setNumberOfTriggeredDateSelection(0);
        setShowTimePicker(true);
        setNumberOfSelectedDates(numberOfSelectedDates + 1);
      }
    },
    [selectedDates]
  );

  const defaultClosedDates = () => {
    const disabledDates = [];

    for (let index = 1; index < 3; index++) {
      disabledDates.push(moment().add(index, "days"));
    }

    setClosedDates(disabledDates);
  };

  const handleNumberOFSelectedDatesAlerts = useCallback(() => {
    if (numberOfSelectedDates === 0) {
      Alert.alert("Notice!!", "Please note that you have to pick three dates.");
    } else if (numberOfSelectedDates === 1) {
      Alert.alert("Great!", "you got two more dates to pick.");
    } else if (numberOfSelectedDates === 2) {
      Alert.alert("Great!", "you got one more date to pick.");
    } else if (numberOfSelectedDates === 3) {
      Alert.alert(
        "Great!",
        "you have selected three dates now you can go to the next step "
      );
    }
  }, [numberOfSelectedDates]);

  const onTimePickerChange = useCallback(
    (event, selectedTime) => {
      if (selectedTime) {
        setCurrentSelectedTime(selectedTime);
        const selectedDatesCopy = [...selectedDates];
        setSelectedDates(selectedDatesCopy);
        selectedDatesCopy[numberOfSelectedDates - 1].time = currentSelectedTime;
        setSelectedDates(selectedDatesCopy);
        setCurrentSelectedTime(new Date(Date.now()));
        setNumberOfTriggeredDateSelection(numberOfTriggeredDateSelection + 1);
      }
    },
    [selectedDates, numberOfSelectedDates, numberOfTriggeredDateSelection]
  );

  const handleNext = () => {
    setBooking({ ...booking, datesData: selectedDates });
    onPress();
  };

  useEffect(() => {
    if (numberOfTriggeredDateSelection > 0) {
      setShowTimePicker(false);
      handleNumberOFSelectedDatesAlerts();
    }
  }, [numberOfTriggeredDateSelection, handleNumberOFSelectedDatesAlerts]);

  useEffect(() => {
    defaultClosedDates();
  }, []);

  console.log("dsa", new Date().getDate() + 1);

  return (
    <View style={styles.container}>
      {/* Reset dates button */}
      {numberOfSelectedDates >= 3 && (
        <View style={{ paddingTop: 10 }}>
          <CustomButton
            text="Reset selected dates"
            onPress={() => {
              setNumberOfSelectedDates(0);
              setSelectedDates([]);
            }}
          />
        </View>
      )}
      <View style={styles.picker}>
        <CalendarPicker
          months={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          headerWrapperStyle={{}}
          onDateChange={onDateChange}
          textStyle={styles.text}
          selectedDayColor={Colors.BUTTON}
          todayBackgroundColor={Colors.GRAY}
          todayTextStyle={{ color: "red" }}
          selectedDayTextStyle={styles.text}
          showDayStragglers={true}
          previousComponent={
            <Arrow
              style={{ marginLeft: 10, transform: [{ rotate: "180deg" }] }}
            />
          }
          disabledDatesTextStyle={{ color: Colors.PLACEHOLDER }}
          nextComponent={<Arrow style={{ marginRight: 10 }} />}
          minDate={new Date().getDate() + 1}
          maxDate={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 2,
              new Date().getDay()
            )
          }
          restrictMonthNavigation
          disabledDates={closedDates}
        />
      </View>
      {showTimePicker && (
        <DateTimePicker
          value={currentSelectedTime || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onTimePickerChange}
        />
      )}
      <CustomButton
        rightIcon={<Arrow />}
        containerStyle={[
          styles.confirtBtn,
          {
            backgroundColor:
              selectedDates.length !== 3 ? Colors.PLACEHOLDER : Colors.BUTTON,
          },
        ]}
        onPress={handleNext}
        text="CONTINUE"
        textSize={16}
        disabled={selectedDates.length !== 3}
      />
    </View>
  );
};

export default DateView;
