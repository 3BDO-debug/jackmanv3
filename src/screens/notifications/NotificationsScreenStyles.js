import {ScaledSheet} from 'react-native-size-matters';
import {Colors} from '../../constants/colors';

const notificationsScreenStyles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: '23@s',
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  titleWrapper: {
    paddingTop: '75@s',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: '25@s',
    color: Colors.WHITE,
  },
  scrollWrapper: {
    flex: 1,
    paddingTop: '30@s',
  },
});

export default notificationsScreenStyles;
