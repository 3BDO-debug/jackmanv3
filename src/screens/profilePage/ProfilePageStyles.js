import { StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// theme
import { Colors } from "../../constants/colors";

const styles = ScaledSheet.create({
  introWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  avatarWrapper: {
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    width: 100,
    height: 100,
  },
  avatarText: {
    fontFamily: "Poppins-Bold",
    fontSize: "25@s",
  },
  titleWrapper: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    color: Colors.WHITE,
    maxWidth: "80%",
  },
  profileTabsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  profileTab: {
    alignItems: "center",
  },
  profileTabText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.WHITE,
  },
  profileTabIndicator: {
    height: 1,
    marginTop: 10,
    width: 120,
  },
  tabContentWrapper: {
    marginTop: 40,
    flex: 1,
  },
});

export default styles;
