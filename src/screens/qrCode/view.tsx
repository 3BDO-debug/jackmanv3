import React, { FC, useMemo } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import { DateIcon, TimeIcon } from "../../constants/svg";
import CustomText from "../../components/customText";
import { scaleHeightSize } from "../../styles/mixins";
import { Qr } from "../../assets";
import LogoImage from "../../components/logo";
import { Colors } from "../../constants/colors";
import { useRecoilValue } from "recoil";
import triggeredBookingAtom from "../../recoil/triggeredBooking";
import moment from "moment";
import PendingBooking from "../../components/__qrCode/PendingBooking";
import RejectedBooking from "../../components/__qrCode/RejectedBooking";
import AcceptedBooking from "../../components/__qrCode/AcceptedBooking";

interface QrCodeViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const QrCodeView: FC<QrCodeViewProps> = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const triggeredBooking = useRecoilValue(triggeredBookingAtom);

  return (
    <View style={styles.container}>
      <CustomText
        text={"Booking dates"}
        size={25}
        fontFamily="bold"
        style={styles.textCenter}
      />
      <CustomText
        text={triggeredBooking?.dealer?.name}
        size={12}
        fontFamily="regular"
        color="placeholder"
        style={styles.textCenter}
      />

      {/* <View style={styles.dataAndTime}>
        <View style={styles.txtAndIcon}>
          <DateIcon color={Colors.WHITE} height={16} width={16} />
          <CustomText text="25th of November" size={13} style={styles.text} />
        </View>

        <View style={styles.line} />

        <View style={styles.txtAndIcon}>
          <TimeIcon />
          <CustomText text="09:30 AM" size={13} style={styles.text} />
        </View>
      </View> */}

      <ScrollView style={[styles.qrContainer, { marginTop: 15 }]}>
        {/* Wrapper */}
        {triggeredBooking?.status === "pending" && (
          <PendingBooking triggeredBooking={triggeredBooking} />
        )}
        {triggeredBooking?.status === "rejected" && (
          <PendingBooking
            rejectedBooking={true}
            triggeredBooking={triggeredBooking}
          />
        )}
        {triggeredBooking?.status === "approved" && (
          <AcceptedBooking triggeredBooking={triggeredBooking} />
        )}
      </ScrollView>
    </View>
  );
};

export default QrCodeView;
