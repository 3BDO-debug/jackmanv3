import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/colors";
import { scaleHeightSize } from "../../styles/mixins";

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      flex: 1,
    },
    contentContainer: {
      paddingBottom: scaleHeightSize(74),
      flex: 1,
    },
    logo: {
      alignSelf: "center",
      marginBottom: scaleHeightSize(55),
      marginTop: scaleHeightSize(109),
    },
    phoneContainer: {
      flexDirection: "row",
      marginTop: scaleHeightSize(10),
      marginBottom: scaleHeightSize(41),
    },
    phoneInputContainer: {
      flex: 5,
    },
    input: {
      fontSize: RFValue(12),
      marginTop: 2,
    },
    flagContainer: {
      height: scaleHeightSize(52),
      flex: 1,
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    flag: {
      width: "50%",
      height: "50%",
    },
    socialBtnIcon: {
      position: "absolute",
      width: 23,
      alignItems: "center",
      left: 20,
    },
    googleBtn: {
      marginBottom: scaleHeightSize(21),
      marginTop: scaleHeightSize(39),
    },
    socialBtn: {
      backgroundColor: Colors.WHITE,
    },
    textWithButtonContainer: {
      flexDirection: "row",
      paddingTop: scaleHeightSize(7),
      alignItems: "center",
      justifyContent: "center",
    },
    loginBtn: {
      paddingLeft: 34,
      marginTop: scaleHeightSize(74),
    },
  });

export default createStyles;
