import React, {FC} from 'react';
import {Image, StyleSheet} from 'react-native';
import {scaleHeightSize} from '../styles/mixins';
import {Logo} from '../assets';

interface LogoImageProps {
  style?: object;
}

const LogoImage: FC<LogoImageProps> = ({style}) => {
  return (
    <Image source={Logo} style={[styles.logo, style]} resizeMode="center" />
  );
};

export default LogoImage;

const styles = StyleSheet.create({
  logo: {
    width: 140,
    height: 25,
    alignSelf: 'center',
    marginTop: scaleHeightSize(90),
    marginBottom: scaleHeightSize(55),
  },
});
