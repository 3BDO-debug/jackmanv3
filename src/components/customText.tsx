import React, {FC} from 'react';
import {Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../constants/colors';

interface TextProps {
  text?: string;
  color?: 'white' | 'black' | 'placeholder' | 'text1' | 'button' | 'red' | any;
  size?: number;
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular' | any;
  style?: object;
  num?: number;
}

const chooseTextColor = (color: string) => {
  switch (color) {
    case 'white':
      return Colors.WHITE;
    case 'black':
      return Colors.BLACK;
    case 'placeholder':
      return Colors.PLACEHOLDER;
    case 'text1':
      return Colors.TEXT1;
    case 'button':
      return Colors.BUTTON;
    case 'red':
      return Colors.RED;
    default:
      break;
  }
};

const chooseFontFamily = (font: string) => {
  switch (font) {
    case 'extraBold':
      return 'Poppins-ExtraBold';
    case 'bold':
      return 'Poppins-Bold';
    case 'semiBold':
      return 'Poppins-SemiBold';
    case 'medium':
      return 'Poppins-Medium';
    case 'regular':
      return 'Poppins-Regular';

    default:
      break;
  }
};

const CustomText: FC<TextProps> = ({
  text = '',
  color = 'white',
  size = 14,
  fontFamily = 'regular',
  style,
  num,
}) => {
  return (
    <Text
      numberOfLines={num}
      style={[
        {
          color: chooseTextColor(color),
          fontFamily: chooseFontFamily(fontFamily),
          fontSize: RFValue(size),
          paddingTop: 4,
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default CustomText;
