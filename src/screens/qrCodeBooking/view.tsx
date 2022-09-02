import React, { FC, useMemo } from "react";
import { Image, View } from "react-native";
import createStyles from "./styles";
import CustomText from "../../components/customText";
import TextBtn from "../../components/textBtn";

import CustomButton from "../../components/customButton";

interface QrCodeBookingViewProps {
  onDonePress: () => void;
}

const QrCodeBookingView: FC<QrCodeBookingViewProps> = ({ onDonePress }) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <CustomText
          text={"Your Request is pending for approval"}
          size={12}
          fontFamily="medium"
          color="black"
          style={{ marginBottom: 20 }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Image source={require("../../assets/images/deadline.png")} />
        </View>

        <View style={{ width: "85%", flexDirection: "row", paddingTop: 30 }}>
          <CustomButton
            text="Return to Main Menu"
            onPress={onDonePress}
            textSize={12}
          />
        </View>
      </View>
    </View>
  );
};

export default QrCodeBookingView;
