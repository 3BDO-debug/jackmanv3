import React, {FC, useMemo} from 'react';
import {Image, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import {DateIcon, TimeIcon} from '../../constants/svg';
import CustomText from '../../components/customText';
import {scaleHeightSize} from '../../styles/mixins';
import {Qr} from '../../assets';
import LogoImage from '../../components/logo';

interface QrCodeViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const QrCodeView: FC<QrCodeViewProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.container}>
      <LogoImage />

      <CustomText
        text={'QR Codes'}
        size={25}
        fontFamily="bold"
        style={styles.textCenter}
      />
      <CustomText
        text={'Mercedes Service Dealer'}
        size={12}
        fontFamily="regular"
        color="placeholder"
        style={styles.textCenter}
      />

      <View style={styles.dataAndTime}>
        <View style={styles.txtAndIcon}>
          <DateIcon />
          <CustomText text="25th of November" size={13} style={styles.text} />
        </View>

        <View style={styles.line} />

        <View style={styles.txtAndIcon}>
          <TimeIcon />
          <CustomText text="09:30 AM" size={13} style={styles.text} />
        </View>
      </View>

      <View style={styles.qrContainer}>
        <CustomText
          text={'Please present the QR code to dealer'}
          size={12}
          fontFamily="medium"
          color="black"
        />

        <Image source={Qr} style={styles.image} />
      </View>
    </View>
  );
};

export default QrCodeView;
