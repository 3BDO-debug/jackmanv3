import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../constants/colors";

const dealersLocationsStyles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: "20@s",
    height: "100%",
  },
  servicesFilter: {
    marginBottom: 10,
  },
  title: {
    color: Colors.WHITE,
    fontFamily: "Poppins-Bold",
    fontSize: 25,
  },
  searchWrapper: {
    paddingTop: 10,
  },
});

export default dealersLocationsStyles;
