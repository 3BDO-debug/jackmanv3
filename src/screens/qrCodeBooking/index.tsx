import React, {FC} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import QrCodeBookingView from './view';

interface QrCodeBookingProps {
  onDonePress: () => void;
}

const QrCodeBooking: FC<QrCodeBookingProps> = ({onDonePress}) => {
  return <QrCodeBookingView onDonePress={onDonePress} />;
};

export default QrCodeBooking;
