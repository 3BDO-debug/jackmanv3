import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const ChooseDealerCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>click me</Text>
    </TouchableOpacity>
  );
};

export default ChooseDealerCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    paddingHorizontal: 21,
    paddingVertical: 10,
    maxWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dealerName: {
    fontFamily: "Poppins-Bold",
    fontSize: 11,
    color: Colors.WHITE,
    textAlign: "center",
  },
});
