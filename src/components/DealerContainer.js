import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useSetRecoilState } from "recoil";
// theme
import { Colors } from "../constants/colors";
// atoms
import popUpAlertAtom from "../recoil/popUpAlert";

const DealerContainer = ({
  dealerData,
  pressable,
  onPressCallback,
  selectedDealer,
}) => {
  const { title, image, location } = dealerData;
  const [selected, setSelected] = useState(false);
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const onPressHandler = () => {
    if (pressable) {
      onPressCallback();
    }
  };

  const handleLocationPress = async () => {
    if (location) {
      await Linking.canOpenURL(location);
      Linking.openURL(location);
    } else {
      setPopUpAlert({
        visible: true,
        title: "Location not available",
        body: `We are sorry locaiton for ${title} not available yet`,
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    }
  };

  useEffect(() => {
    if (selectedDealer?.id === dealerData?.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [dealerData, selectedDealer]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!pressable) {
          handleLocationPress();
        }
      }}
      style={[
        styles.wrapper,
        { transform: [{ scale: pressable && selected ? 1.3 : 1 }] },
      ]}
    >
      {/* Dealer name */}
      <View style={styles.dealerNameWrapper}>
        <Text numberOfLines={2} style={[styles.dealerNameText]}>
          {title}
        </Text>
      </View>
      {/* Dealer image */}
      <TouchableWithoutFeedback onPress={onPressHandler}>
        <View
          style={[
            styles.dealerImageWrapper,
            {
              backgroundColor:
                pressable && selected ? Colors.BUTTON : Colors.WHITE,
            },
          ]}
        >
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={[
                styles.dealerAvatar,
                {
                  width: pressable && selected ? 55 : 70,
                  height: pressable && selected ? 55 : 70,
                },
              ]}
            />
          ) : (
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 10,
                color: pressable && selected ? Colors.WHITE : Colors.BUTTON,
              }}
            >
              Jackman
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      {/* Dealer location name */}
      {/* <View style={styles.dealerLocationNameWrapper}>
        <Text numberOfLines={2} style={styles.dealerLocationNameText}>
          {title}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 190,
  },
  dealerNameWrapper: {
    paddingBottom: 10,
    width: 70,
  },
  dealerNameText: {
    fontFamily: "Poppins-Bold",
    fontSize: 11,
    color: Colors.WHITE,
    textAlign: "center",
  },
  dealerImageWrapper: {
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
    width: 70,
    height: 70,
  },
  dealerLocationWrapper: {
    paddingTop: 12,
  },
  dealerLocationText: {
    fontFamily: "Poppins-Regular",
    fontSize: 5,
    color: Colors.WHITE,
    textAlign: "center",
  },
  dealerLocationNameWrapper: {
    width: 70,
    marginTop: 5,
  },
  dealerLocationNameText: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: Colors.WHITE,
    textAlign: "center",
  },
  dealerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 9,
  },
});

export default DealerContainer;
