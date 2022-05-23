import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/colors';
import {scaleHeightSize} from '../styles/mixins';
import CustomText from './customText';
import {CheckIcon, RightIcon} from '../constants/svg';

interface ChooseCarCardProps {
  containerStyle?: object;
  item: any;
  onSelected?: () => void;
  index: number;
  selected: number;
}

const ChooseCarCard: FC<ChooseCarCardProps> = ({
  containerStyle,
  item,
  onSelected,
  selected,
  index,
}) => {

  

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>

        <CustomText text={item?.manufacturer.name} color="text1" size={16} />
        <CustomText text={item?.chassisName} color="text1" size={14} />

      </View>

      <Pressable onPress={onSelected} style={styles.checkContainer}>
        <View style={styles.checkView}>
          {index == selected && <CheckIcon />}
        </View>
      </Pressable>
    </View>
  );
};

export default ChooseCarCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleHeightSize(5),
    paddingBottom: scaleHeightSize(10),
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingLeft: 12,
    marginBottom: scaleHeightSize(10),
    height: scaleHeightSize(80),
    flexDirection: 'row',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
  },
  timeText: {
    flex: 1,
    textAlign: 'center',
  },
  nameText: {
    flex: 1,
  },
  checkContainer: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  checkView: {
    width: 17,
    height: 17,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BUTTON,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
