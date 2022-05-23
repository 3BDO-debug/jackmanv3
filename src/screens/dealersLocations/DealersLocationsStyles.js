import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../constants/colors";

const dealersLocationsStyles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: "20@s",
    height: "100%",
  },
  title: {
    color: Colors.WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: "25@s",
    marginTop: "100@s",
  },
  searchWrapper: {
    paddingVertical: "40@s",
  },
});

export default dealersLocationsStyles;
