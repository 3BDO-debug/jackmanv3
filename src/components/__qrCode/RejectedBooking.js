import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RejectedBooking = ({ triggeredBooking }) => {
  console.log("triggered", triggeredBooking);

  return (
    <View>
      <Text>RejectedBooking</Text>
    </View>
  );
};

export default RejectedBooking;

const styles = StyleSheet.create({});
