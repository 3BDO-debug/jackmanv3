import { StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// theme
import { Colors } from "../../../constants/colors";

const styles = ScaledSheet.create({
  wrapper: {
    marginBottom: "20@s",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelWrapper: {
    marginBottom: "10@s",
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: Colors.PLACEHOLDER,
    fontSize: "14@s",
  },
  value: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.WHITE,
    maxWidth: 200,
  },
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "left",
    overflow: "hidden",
  },
  actionButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: Colors.PLACEHOLDER,
  },
});

export default styles;
