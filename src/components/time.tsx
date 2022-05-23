import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../constants/colors';
import CustomText from './customText';

interface TimeProps {
  containerStyle?: object;
  item: any;
  onPress: () => void;
  isPress?: boolean;
}

const Time: FC<TimeProps> = ({containerStyle, item, onPress, isPress}) => {
  const [selectedTime, setSelectedTime] = useState();
  const [isselectedTime, setIsSelectedTime] = useState(-1);

  return (
    <TouchableOpacity
      style={{flex: 1, alignItems: 'center'}}
      onPress={() => {
        onPress();
      }}>
      <View
        style={{
          backgroundColor: isPress ? Colors.WHITE : Colors.BUTTON,
          height: 30,
          borderRadius: 10,
          width: '60%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          text={item}
          size={13}
          fontFamily="regular"
          color={isPress ? 'black' : 'white'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Time;
