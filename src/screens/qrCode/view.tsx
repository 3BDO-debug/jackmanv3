import React, { FC, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import { DateIcon, TimeIcon } from '../../constants/svg';
import CustomText from '../../components/customText';
import { scaleHeightSize } from '../../styles/mixins';
import { Qr } from '../../assets';
import LogoImage from '../../components/logo';
import { Colors } from '../../constants/colors';
import { useRecoilValue } from 'recoil';
import triggeredBookingAtom from '../../recoil/triggeredBooking';
import moment from "moment";

interface QrCodeViewProps {
  navigation: NavigationProp<ParamListBase>;

}

const QrCodeView: FC<QrCodeViewProps> = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const triggeredBooking = useRecoilValue(triggeredBookingAtom);




  return (
    <View style={styles.container}>
      <LogoImage />

      <CustomText
        text={'Booking dates'}
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

      {/*       <View style={styles.dataAndTime}>
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

      <View style={[styles.qrContainer, { marginTop: 15 }]}>
        {/* Wrapper */}
        {triggeredBooking?.requestedDates.map((requestedDate, index) => {
          const renderTitle = () => {
            let title;
            if (index === 0) {
              title = "First requested date";
            } else if (index === 1) {
              title = "Second requested date";
            } else if (index === 2) {
              title = "Third requested date";
            }
            return title;
          }
          return (
            <View>
              {/* Requested date container */}
              <View style={[styles.requestedDateContainer, { marginTop: index > 0 ? 18 : 0 }]}>
                <Text style={styles.requestedDateContainerTitle}>{renderTitle()}</Text>
                <View style={styles.dataAndTime}>
                  <View style={styles.txtAndIcon}>
                    <DateIcon color={Colors.BLACK} height={20} width={14} />
                    <Text style={[styles.text, { fontFamily: "Poppins-Regular", fontSize: 15 }]} >
                      {new Date(requestedDate).toDateString()}
                    </Text>
                  </View>

                  <View style={styles.line} />

                  <View style={styles.txtAndIcon}>
                    <TimeIcon color={Colors.BLACK} height={20} width={14} />
                    <Text style={[styles.text, { fontSize: 15, fontFamily: "Poppins-Regular" }]} >{moment(requestedDate).format('hh:mm:A')}</Text>
                  </View>
                </View>
              </View>
              {/* Divider wrapper */}
              {index !== triggeredBooking?.requestedDates.length - 1 && < View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: Colors.GRAY, height: 1, width: "70%", marginHorizontal: 10, opacity: 0.5 }} />
              </View>}
            </View>
          )
        }

        )}

      </View>
    </View >
  );
};

export default QrCodeView;
