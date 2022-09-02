import { StyleSheet } from "react-native";
// theme
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  titleWrapper: {
    marginTop: 30,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.WHITE,
  },
  formWrapper: {
    marginTop: 25,
    paddingBottom: 100,
  },
  fieldWrapper: {
    marginBottom: 20,
  },
  dropDownInput: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderRadius: 18,
    height: 50,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  rowFields: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  rowFieldWrapper: {
    flex: 1,
  },
  formSubmitWrapper: {
    paddingVertical: 20,
  },
});

export default styles;
