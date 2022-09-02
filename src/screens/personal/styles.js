import { StyleSheet } from "react-native";
// theme
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
    paddingHorizontal: 20,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "25%",
  },
  formTitleWrapper: {
    marginTop: 20,
  },
  formTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.WHITE,
  },
  formWrapper: {
    marginTop: 28,
    flex: 1,
  },
});

export default styles;
