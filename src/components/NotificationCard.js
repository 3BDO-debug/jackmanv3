import {View, Text, Image} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Colors} from '../constants/colors';

const NotificationCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Avatar wrapper */}
        <View style={styles.avatarWrapper}>
          <Image source={require('../assets/images/Mercedes-Benz-l.png')} />
        </View>
        {/* Details wrapper */}
        <View>
          {/* Title */}
          <Text style={styles.title}>Abou Ghaly Motors</Text>
          {/* Body */}
          <Text style={styles.bodyText}>
            Don’t forget your maintenance schedule at 9:30 AM
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    marginBottom: '20@s',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '30@s',
  },
  avatarWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    paddingTop: '18@s',
  },
  titlesWrapper: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: '14@s',
    color: Colors.BLACK,
    textAlign: 'left',
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: '12@s',
    color: Colors.BUTTON,
  },
});

export default NotificationCard;
