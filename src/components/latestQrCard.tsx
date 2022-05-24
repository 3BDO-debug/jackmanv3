import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';
import TextBtn from './textBtn';
import moment from "moment";

interface LatestQrCardProps {
  containerStyle?: object;
  item: any;
  onShowPress?: () => void;
}

const LatestQrCard: FC<LatestQrCardProps> = ({
  containerStyle,
  item,
  onShowPress,
}) => {


  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomText
          text={item.name}
          color="placeholder"
          style={styles.nameText}
        />

        <CustomText
          text={item.time}
          color="text1"
          size={11}
          style={styles.timeText}
        />
      </View>

      <View style={styles.bodyContainer}>
        <CustomText text={new Date(item.requestedDates[0]).toDateString()} color="text1" size={16} />

        <TextBtn
          text="Show"
          textSize={11}
          textColor="button"
          fontFamily="medium"
          style={styles.historyBtn}
          onPress={onShowPress}
        />
      </View>
    </View>
  );
};

export default LatestQrCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleHeightSize(5),
    paddingBottom: scaleHeightSize(22),
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: scaleHeightSize(10),
    // height: scaleHeightSize(80),
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyBtn: {
    marginLeft: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeText: {
    textAlign: 'center',
  },
  nameText: {
    flex: 1,
  },
});
