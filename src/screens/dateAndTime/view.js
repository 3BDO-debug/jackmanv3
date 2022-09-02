import React, { useCallback, useEffect, useState } from "react";
import { View, Platform, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { TimePickerModal } from "react-native-paper-dates";
// theme
import { Colors } from "../../constants/colors";
// components
import CustomText from "../../components/customText";
import AlertModal from "../../components/__dateAndTime/AlertModal";
import CustomButton from "../../components/customButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import bookingAtom from "../../recoil/booking";
import popUpAlertAtom from "../../recoil/popUpAlert";

// ------------------------------------------------------------------------------------------------------------------------------------

const calendarTheme = {
  calendarBackground: "transparent",
  disabledDotColor: "yellow",
  textDisabledColor: Colors.PLACEHOLDER,
  dayTextColor: Colors.WHITE,
  todayTextColor: Colors.WHITE,
  todayBackgroundColor: Colors.GRAY,
  monthTextColor: Colors.WHITE,
  arrowColor: Colors.WHITE,
  selectedDayTextColor: Colors.WHITE,
  selectedDayBackgroundColor: Colors.BUTTON,
};

// ------------------------------------------------------------------------------------------------------------------------------------

const DateView = ({ onPress }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [calendarMinDate, setCalendarMinDate] = useState("2022-06-14");
  const [calendarMaxDate, setCalendarMaxDate] = useState("2022-06-14");
  const [instructionText, setInstructionText] = useState(
    "Please select three dates for booking"
  );
  const [timePickerIsTriggered, triggerTimePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [booking, setBooking] = useRecoilState(bookingAtom);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);
  const [instructionPopUpIsTriggered, triggerInstructionPopUp] =
    useState(false);

  /* Dismiss handler for the time picker modal */

  const deleteLastSelectedDateAfterTimePickerDismiss = useCallback(() => {
    const selectedDatesCopy = { ...selectedDates };
    const selectedDatesData = Object.keys(selectedDatesCopy);
    const lastSelectedDate = selectedDatesData.pop();
    delete selectedDatesCopy[lastSelectedDate];
    setSelectedDates(selectedDatesCopy);
  }, [selectedDates, setSelectedDates]);

  const onTimePickerDismiss = useCallback(() => {
    triggerTimePicker(false);
    deleteLastSelectedDateAfterTimePickerDismiss();
  }, [
    triggerTimePicker,
    deleteLastSelectedDateAfterTimePickerDismiss,
    selectedDates,
  ]);

  /* Time picker validator for the schema time ranga [9:00 AM to 5:00 PM] */

  const selectedTimeIsWithinTheSelectedRange = useCallback(
    (time) => {
      let proceed;
      const startTime = moment("08:00:00", "HH:mm:ss");
      const endTime = moment("21:00:00", "HH:mm:ss");
      const selectedTime = moment(time, "HH:mm:ss");
      if (selectedTime.isBetween(startTime, endTime)) {
        proceed = true;
      } else {
        triggerTimePicker(false);
        setPopUpAlert({
          visible: true,
          title: "Time not within range",
          body: "Your selected time isn't within the working hours [ 9:00 AM - 5:00 PM ]",
          popUpActionText: "understood",
          popUpActionHandler: () => triggerTimePicker(true),
        });

        proceed = false;
      }
      return proceed;
    },
    [setPopUpAlert]
  );

  /* Confirm handler for the time picker modal */

  const onTimePickerConfirm = (time) => {
    const selectedTime = moment(time).format("HH:mm:ss");
    if (selectedTimeIsWithinTheSelectedRange(selectedTime)) {
      const selectedTimesArrayCopy = [...selectedTimes];
      selectedTimesArrayCopy.push(moment(time).format("HH:mm:ss"));
      setSelectedTimes(selectedTimesArrayCopy);
      triggerTimePicker(false);
    }
  };

  /* Validation to confirm that the user's selected date matches the required schema */

  const validateDateSelection = (date) => {
    const today = moment();
    const convertedDateInput = moment(date.dateString);
    const isToday = today.format("YYYY-MM-DD") === date.dateString;
    const differenceBetweenDates = convertedDateInput.diff(today, "days");

    if (isToday) {
      setPopUpAlert({
        visible: true,
        title: "Warning",
        body: "You cannot choose today as booking date, the least valid booking date is two days after today",
        popUpActionText: "understood",
        popUpActionHandler: () => false,
      });
    } else if (
      !isToday &&
      (differenceBetweenDates + 1 === 1 || differenceBetweenDates + 1 === 2)
    ) {
      setPopUpAlert({
        visible: true,
        title: "Notice",
        body: "The least valid booking date is two days after today",
        popUpActionText: "understood",
        popUpActionHandler: () => false,
      });
    } else {
      handleDateChange(date);
    }
  };

  /* Sync the date unselection with the selected time */

  const handleDateDeletion = (deletedDateIndex) => {
    const filteredSelectedTimesArray = selectedTimes.filter(
      (selectedTime) => selectedTime !== selectedTimes[deletedDateIndex]
    );

    setSelectedTimes(filteredSelectedTimesArray);
  };

  /* Util for finding the index of deleted date */

  const dateIndexFinder = (date) => {
    return Object.keys(selectedDates).findIndex(
      (selectedDate) => selectedDate === date
    );
  };

  /* Main date handler */

  const handleDateChange = (date) => {
    const selectedDaysKeys = Object.keys(selectedDates);
    const selectedDatesCopy = { ...selectedDates };

    if (
      selectedDaysKeys.length >= 3 &&
      !Boolean(date.dateString in selectedDates)
    ) {
      handleDateDeletion(dateIndexFinder(date.dateString));

      delete selectedDatesCopy[selectedDaysKeys[2]];
      setSelectedDates({
        ...selectedDatesCopy,
        [date.dateString]: { selected: true },
      });
      triggerInstructionPopUp(true);
    } else {
      if (date.dateString in selectedDates) {
        handleDateDeletion(dateIndexFinder(date.dateString));
        delete selectedDatesCopy[date.dateString];
        setSelectedDates(selectedDatesCopy);
      } else {
        setSelectedDates({
          ...selectedDates,
          [date.dateString]: { selected: true },
        });
        triggerInstructionPopUp(true);
      }
    }
  };

  /* Submission handler */

  const actionButtonHandler = () => {
    const bookedDates = [];
    const mappedSelectedDates = Object.keys(selectedDates);
    for (let index = 0; index < mappedSelectedDates.length; index++) {
      bookedDates.push({
        [`requestedDate${
          index + 1
        }`]: `${mappedSelectedDates[index]}T${selectedTimes[index]}`,
      });
    }
    setBooking({ ...booking, bookingDates: bookedDates });
  };

  /* Current date generator */

  const currentDateGenerator = useCallback(() => {
    const today = moment();
    const formattedTodayDate = today.format("YYYY-MM-DD");
    return formattedTodayDate;
  }, []);

  /* Intial effect to select the calendar min and max date selection */

  useEffect(() => {
    const today = moment();
    const todayAfterTwoMonths = moment().add(2, "M");
    setCalendarMinDate(today.format("YYYY-MM-DD"));
    setCalendarMaxDate(todayAfterTwoMonths.format("YYYY-MM-DD"));
  }, []);

  /* Instruction text effect  */

  useEffect(() => {
    const selectedDatesLength = selectedTimes.length;
    if (selectedDatesLength === 3) {
      setInstructionText("Great!, you have selected three dates successfully");
    } else if (selectedDatesLength === 2) {
      setInstructionText("One date remaining to select");
    } else if (selectedDatesLength === 1) {
      setInstructionText("Two dates remaining to select");
    } else if (selectedDatesLength === 0) {
      setInstructionText("Please select three dates for booking");
    }
  }, [selectedTimes]);

  useEffect(() => {
    if (instructionPopUpIsTriggered) {
      setPopUpAlert({
        visible: true,
        title: "Attention",
        body: "Please select hours, minutes first then toggle between AM - PM, Valid time range is from [9:00 AM - 9:00 PM]",
        popUpActionText: "understood",
        popUpActionHandler: () => triggerTimePicker(true),
        customDismissHandler: () =>
          deleteLastSelectedDateAfterTimePickerDismiss(),
        hasCustomDismissHandler: true,
      });
      triggerInstructionPopUp(false);
    }
  }, [instructionPopUpIsTriggered, triggerInstructionPopUp]);

  return (
    <View>
      {/* Instruction text */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <CustomText color="white" text={instructionText} size={12} />
      </View>
      {/* Calendar */}
      <Calendar
        theme={calendarTheme}
        markingType="custom"
        minDate={calendarMinDate}
        maxDate={calendarMaxDate}
        enableSwipeMonths
        onDayPress={validateDateSelection}
        markedDates={{
          ...selectedDates,
          [moment().add(1, "day").format("YYYY-MM-DD")]: { disabled: true },
          [moment().add(2, "day").format("YYYY-MM-DD")]: { disabled: true },
        }}
        current={currentDateGenerator()}
        style={{ marginRight: 20 }}
      />

      {/* Time picker */}
      <TimePickerModal
        visible={timePickerIsTriggered}
        onDismiss={onTimePickerDismiss}
        onConfirm={onTimePickerConfirm}
        label="Select time"
        uppercase={true}
        cancelLabel="Cancel"
        confirmLabel="Ok"
        animationType="slide"
        locale="en"
      />

      {/* Action button */}

      <View style={{ paddingHorizontal: 20, marginTop: 40, marginRight: 20 }}>
        <CustomButton
          containerStyle={{
            backgroundColor:
              selectedTimes.length < 3 ? Colors.PLACEHOLDER : Colors.BUTTON,
          }}
          onPress={() => {
            if (Object.keys(selectedDates).length >= 3) {
              actionButtonHandler();
              onPress();
            }
          }}
          disabled={
            selectedTimes.length < 3 || Boolean(Object.keys(selectedDates) < 3)
          }
          text="Next step"
        />
      </View>
    </View>
  );
};

export default DateView;
