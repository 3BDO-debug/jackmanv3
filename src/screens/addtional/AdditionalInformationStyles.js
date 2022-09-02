import { StyleSheet } from "react-native";
// theme
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    flex: 1,
    marginHorizontal: 35,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.WHITE,
  },
  formWrapper: {
    paddingVertical: 30,
  },
  fieldWrapper: {
    marginBottom: 30,
  },
  locationInputWrapper: {
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationInputValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    width: "75%",
  },
  actionButtonWrapper: {
    marginBottom: 50,
    marginTop: 70,
  },
});

export default styles;
