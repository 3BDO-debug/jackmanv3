import React, {FC, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import BookingView from './view';

interface BookingProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const Booking: FC<BookingProps> = ({navigation, route}) => {
  return <BookingView navigation={navigation} route={route} />;
};

export default Booking;
