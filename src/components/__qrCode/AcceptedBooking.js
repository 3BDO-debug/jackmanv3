import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
//
import { DateIcon } from "../../constants/svg";
import { TimeIcon } from "../../constants/svg";
import { Colors } from "../../constants/colors";

// -------------------------------------------------------------------------------------------

const AcceptedBooking = ({ triggeredBooking }) => {
  return (
    <View>
      {/* Requested date container */}
      <View style={[styles.requestedDateContainer, { marginTop: 18 }]}>
        <Text style={styles.requestedDateContainerTitle}>Approved date</Text>
        <View style={styles.dataAndTime}>
          <View style={styles.txtAndIcon}>
            <DateIcon color={Colors.BLACK} height={20} width={14} />
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins-Regular", fontSize: 15 },
              ]}
            >
              {new Date(triggeredBooking.selectedDate).toDateString()}
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
              {moment(triggeredBooking.selectedDate)
                .add(-2, "hours")
                .format("hh:mm A")}
            </Text>
          </View>
        </View>
      </View>
      {/* Divider wrapper */}
    </View>
  );
};

export default AcceptedBooking;

const styles = StyleSheet.create({
  requestedDateContainer: {
    paddingHorizontal: 30,
  },
  requestedDateContainerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  requestedDateContainerBody: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
  dataAndTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  txtAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  line: {
    height: "100%",
    width: 1,
    backgroundColor: Colors.PLACEHOLDER,
  },
});
