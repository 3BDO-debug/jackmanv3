import { StyleSheet, Dimensions } from "react-native";
// theme
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND,
    height: "100%",
  },
  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "25%",
  },
  locationSearchWrapper: {
    position: "absolute",
    zIndex: 10,
    top: 150,
    paddingHorizontal: 40,
    width: Dimensions.get("window").width,
  },
  locationSearchContainer: {
    flexDirection: "row",
  },
  locationSearchTextInput: {
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    paddingHorizontal: 30,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 1,
  },
  locationDetailsCardWrapper: {
    flexDirection: "row",
    marginHorizontal: 21,
    zIndex: 10,
    position: "absolute",
    flex: 1,
  },
  locationDetailsCardContainer: {
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 24,
    flex: 1,
    elevation: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  locationDetailsCardTitle: {
    fontFamily: "Poppins-Regular",
    color: Colors.GRAY,
    fontSize: 13,
  },
  selectedLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  selectedLocationText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: Colors.BLACK,
    marginLeft: 10,
  },
});

export default styles;
