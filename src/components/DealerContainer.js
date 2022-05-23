import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../constants/colors";

const DealerContainer = ({
  dealerData,
  pressable,
  onPressCallback,
  selectedDealer,
}) => {
  const { title, image } = dealerData;
  const [selected, setSelected] = useState(false);

  const onPressHandler = () => {
    if (pressable) {
      onPressCallback();
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
    <View style={styles.wrapper}>
      {/* Dealer name */}
      <View style={styles.dealerNameWrapper}>
        <Text style={styles.dealerNameText}>{title}</Text>
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
          <Image source={image} />
        </View>
      </TouchableWithoutFeedback>
      {/* Dealer location name */}
      <View style={styles.dealerLocationNameWrapper}>
        <Text style={styles.dealerLocationNameText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingVertical: "30@s",
    justifyContent: "center",
    alignItems: "center",
    height: 220,
  },
  dealerNameWrapper: {
    paddingBottom: "12@s",
    width: 70,
  },
  dealerNameText: {
    fontFamily: "Poppins-Bold",
    fontSize: "11@s",
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
    paddingTop: "12@s",
  },
  dealerLocationText: {
    fontFamily: "Poppins-Regular",
    fontSize: "11@s",
    color: Colors.WHITE,
    textAlign: "center",
  },
  dealerLocationNameWrapper: {
    width: 70,
    marginTop: 5,
  },
  dealerLocationNameText: {
    fontFamily: "Poppins-Regular",
    fontSize: "11@s",
    color: Colors.WHITE,
    textAlign: "center",
  },
});

export default DealerContainer;
