import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      borderRadius: 20,
      flex: 1,
    },
    contentContainer: {},
    logo: {
      alignSelf: "center",
    },
    input: {
      fontSize: 11,
    },
    Btn: {
      paddingLeft: 34,
      marginTop: 37,
      marginBottom: 30,
    },
    estimateContainer: {
      backgroundColor: Colors.WHITE,
      paddingTop: 18,
      paddingBottom: 11,
      paddingHorizontal: 42,
      borderRadius: 20,
      marginTop: 29,
      marginBottom: 34,
    },
    estimateHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 23,
    },
    timeElement: {
      alignItems: "center",
    },
    carListHeader: {
      flexDirection: "row",
    },
    addCarBtn: {
      marginLeft: 16,
    },
    helloText: {},
    filterByServiceWrapper: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 30,
    },
    filterByServiceTitle: {
      fontFamily: "Poppins-Bold",
      fontSize: 17,
      color: Colors.WHITE,
    },
    filterByServiceValue: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: Colors.BUTTON,
      marginLeft: 10,
    },
    servicesWrapper: {},
  });

export default createStyles;
