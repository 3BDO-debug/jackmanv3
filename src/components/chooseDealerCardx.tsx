import React, {FC, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/colors';
import {scaleHeightSize} from '../styles/mixins';
import CustomText from './customText';
import {RightIcon} from '../constants/svg';
import {Qr} from '../assets';
import {ParallaxImage} from 'react-native-snap-carousel';

interface ChooseDealerCardProps {
  containerStyle?: object;
  item: any;
  onSelected?: () => void;
  index: number;
  selected?: number;
}

const ChooseDealerCard: FC<ChooseDealerCardProps> = ({
  containerStyle,
  item,
  onSelected,
  selected,
  index,
}) => {
  return (
    <Pressable style={[styles.container, containerStyle]}>
      <ParallaxImage
        source={Qr}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
      />
    </Pressable>
  );
};

export default ChooseDealerCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.GRAY,
    borderRadius: 20,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
