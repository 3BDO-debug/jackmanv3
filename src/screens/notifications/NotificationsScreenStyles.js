import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../constants/colors";

const notificationsScreenStyles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: "23@s",
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  titleWrapper: {
    paddingTop: "35@s",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: "25@s",
    color: Colors.WHITE,
  },
  scrollWrapper: {
    flex: 1,
    paddingTop: "30@s",
  },
  emptyNotificationsWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyNotificationsTitle: {
    fontFamily: "Poppins-Bold",
    marginTop: 30,
    fontSize: 20,
    color: Colors.WHITE,
  },
  emptyNotificationsBody: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.PLACEHOLDER,
    textAlign: "center",
  },
  emptyNotificationsActionWrapper: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginTop: 70,
  },
});

export default notificationsScreenStyles;
