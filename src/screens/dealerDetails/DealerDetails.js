import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Ionicons } from "react-native-vector-icons";
// atoms
import bookingAtom from "../../recoil/booking";
import popUpAlertAtom from "../../recoil/popUpAlert";
// components
import Screen from "../../components/Screen";
import { Colors } from "../../constants/colors";
import ActionButton from "../../components/ActionButton";

// -------------------------------------------------------------------

const DealerDetails = ({ navigation, route }) => {
  const dealerDataFromBooking = useRecoilValue(bookingAtom)?.dealerData;

  const [dealerData, setDealerData] = useState({});

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const bookDealerHandler = () => {
    if (route.params?.editingCar) {
      navigation.navigate("Booking", { carDetailsEdited: true });
    } else {
      navigation.navigate("Booking");
    }
  };

  const viewDealerLocationHandler = () => {
    Linking.openURL(dealerData?.location).catch((error) => {
      console.log("Error openeing dealer location", error);
      setPopUpAlert({
        visible: true,
        title: "Unable to open location",
        body: "We are sorry, we are not able to currently open dealer's location as the location may be changed. Please try again later.",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    });
  };

  useEffect(() => {
    if (route?.params?.clickedFromDealersLocations) {
      setDealerData(route?.params?.dealerData);
    } else {
      setDealerData(dealerDataFromBooking);
    }
  }, [dealerDataFromBooking, route?.params]);


  return (
    <Screen hideFooter>
      <ScrollView style={styles.wrapper}>
        {/* Dealer intro */}
        <View style={styles.dealerIntroWrapper}>
          {/* Dealer logo & name */}
          <View style={styles.dealerLogoNameWrapper}>
            {/* Dealer logo */}
            {dealerData?.image ? (
              <View style={styles.dealerLogoWrapper}>
                <Image
                  style={styles.dealerLogo}
                  source={{ uri: dealerData?.image }}
                />
              </View>
            ) : (
              <View
                style={{
                  borderRadius: 9,
                  backgroundColor: Colors.WHITE,
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors.BUTTON,
                    fontFamily: "Poppins-Bold",
                    fontSize: 10,
                  }}
                >
                  Jackman
                </Text>
              </View>
            )}
            {/* Dealer info wrapper */}
            <View>
              <Text style={styles.dealerName}>{dealerData?.name}</Text>
              {/* Dealer location */}

              {dealerData?.location?.length !== 0 &&
                dealerData?.location !== "Online" && (
                  <TouchableOpacity onPress={viewDealerLocationHandler}>
                    <View style={styles.dealerLocationWrapper}>
                      <Ionicons
                        name="location-sharp"
                        color={Colors.BUTTON}
                        size={20}
                      />
                      {/* Location text */}
                      <Text style={styles.locationText}>View location</Text>
                    </View>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
        {/* Dealer full info */}
        <View style={styles.dealerDescriptionWrapper}>
          <Text style={styles.dealerDescriptionTitle}>Description</Text>
          {/* Description */}
          <View>
            <Text style={styles.dealerDescription}>
              {dealerData?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Action button */}
      {!route?.params?.clickedFromDealersLocations && (
        <View style={styles.actionButtonWrapper}>
          <ActionButton
            onPress={bookDealerHandler}
            title="BOOK NOW"
            icon={false}
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dealerIntroWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  dealerLogoNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  dealerLogoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    width: 70,
    height: 70,
  },
  dealerLogo: {
    width: 60,
    height: 60,
    borderRadius: 9,
  },
  dealerName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.WHITE,
  },
  dealerLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textDecorationLine: "underline",
    color: Colors.BUTTON,
    marginLeft: 3,
  },
  dealerDescriptionWrapper: {
    marginTop: 27,
  },
  dealerDescriptionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.WHITE,
  },
  dealerDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.WHITE,
    marginTop: 12,
  },
  actionButtonWrapper: {
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default DealerDetails;
