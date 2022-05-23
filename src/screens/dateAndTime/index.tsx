import React, {FC, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import DateView from './view';

interface DateProps {
  navigation: NavigationProp<ParamListBase>;
  onPress: () => void;
  disable?: boolean;
  selectedDate: (date: any) => void;
  selectedTime: (date: any, index: any) => void;
  dateSelected: string;
  timeSelected: number;
}

const Date: FC<DateProps> = ({
  navigation,
  onPress,
  selectedDate,
  selectedTime,
  dateSelected,
  timeSelected,
}) => {
  return (
    <DateView
      onPress={() => {
        onPress();
      }}
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      navigation={navigation}
      dateSelected={dateSelected}
      timeSelected={timeSelected}
    />
  );
};

export default Date;
