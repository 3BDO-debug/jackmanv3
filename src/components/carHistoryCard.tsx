import moment from 'moment';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';

interface CarHistoryCardProps {
  containerStyle?: object;
  item: any;
  onShowPress?: () => void;
}

const CarHistoryCard: FC<CarHistoryCardProps> = ({ containerStyle, item }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomText
          text={item.car.manufacturer?.name}
          color="placeholder"
          style={styles.nameText}
        />
      </View>

      <View style={styles.bodyContainer}>
        <CustomText text={item.dealer.name} color="text1" size={16} />

        <CustomText
          text={moment(item.startTime).format('D MMM YYYY')}
          color="button"
        />
      </View>
    </View>
  );
};

export default CarHistoryCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleHeightSize(14),
    paddingBottom: scaleHeightSize(22),
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: scaleHeightSize(10),
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
    flex: 1,
    textAlign: 'center',
  },
  nameText: {
    flex: 1,
  },
});
