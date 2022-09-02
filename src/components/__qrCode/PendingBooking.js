import React from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";
//
import { DateIcon } from "../../constants/svg";
import { TimeIcon } from "../../constants/svg";
import { Colors } from "../../constants/colors";
import { ScaledSheet } from "react-native-size-matters";

// -----------------------------------------------------------------------------------------------

function PendingBooking({ triggeredBooking, rejectedBooking }) {
  const renderTitle = (index) => {
    let title;
    if (index === 0) {
      title = rejectedBooking ? "First suggested date" : "First requested date";
    } else if (index === 1) {
      title = rejectedBooking
        ? "Second requested date"
        : "Second requested date";
    } else if (index === 2) {
      title = rejectedBooking ? "Third suggested date" : "Third requested date";
    }
    return title;
  };

  const datesData = () => {
    let data;
    if (rejectedBooking) {
      data = triggeredBooking.suggestedDates;
    } else {
      data = triggeredBooking.requestedDates;
    }

    return data;
  };

  return datesData().map((requestedDate, index) => (
    <View>
      {/* Requested date container */}
      <View
        style={[
          styles.requestedDateContainer,
          { marginTop: index > 0 ? 18 : 0 },
        ]}
      >
        <Text style={styles.requestedDateContainerTitle}>
          {renderTitle(index)}
        </Text>
        <View style={styles.dataAndTime}>
          <View style={styles.txtAndIcon}>
            <DateIcon color={Colors.BLACK} height={20} width={14} />
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins-Regular", fontSize: 15 },
              ]}
            >
              {new Date(requestedDate).toDateString()}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.txtAndIcon}>
            <TimeIcon color={Colors.BLACK} height={20} width={14} />
            <Text
              style={[
                styles.text,
                { fontSize: 15, fontFamily: "Poppins-Regular" },
              ]}
            >
              {moment(requestedDate).add(-2, "hours").format("hh:mm A")}
            </Text>
          </View>
        </View>
      </View>
      {/* Divider wrapper */}
      {index !== triggeredBooking?.requestedDates.length - 1 && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: Colors.GRAY,
              height: 1,
              width: "70%",
              marginHorizontal: 10,
              opacity: 0.5,
            }}
          />
        </View>
      )}
    </View>
  ));
}

const styles = ScaledSheet.create({
  requestedDateContainer: {
    paddingHorizontal: "30@s",
  },
  requestedDateContainerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: "20@s",
  },
  requestedDateContainerBody: {
    fontFamily: "Poppins-Medium",
    fontSize: "15@s",
  },
  dataAndTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "30@s",
  },
  txtAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10@s",
  },
  text: {
    marginLeft: "10@s",
  },
  line: {
    height: "100%",
    width: "1@s",
    backgroundColor: Colors.PLACEHOLDER,
    marginRight: "7@s",
  },
});

export default PendingBooking;
