import { StyleSheet } from "react-native";
// theme
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    height: "100%",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.WHITE,
  },
  englishSubtitleWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  arabicSubtitleWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  englishSubtitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: Colors.WHITE,
  },
  arabicSubtitle: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    color: Colors.WHITE,
  },
  termsAndConditionsDataWrapper: {
    marginTop: 20,
    paddingBottom: 20,
  },
  termAndConditionItemWrapper: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  termAndConditionItemEnglishText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.WHITE,
  },
  termAndConditionItemArabicText: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    color: Colors.WHITE,
  },
});

export default styles;
