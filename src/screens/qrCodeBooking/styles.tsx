import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      height: '100%',
      // flex: 1,
    },

    textCenter: {
      alignSelf: 'center',
    },

    qrContainer: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingVertical: scaleHeightSize(20),
      alignItems: 'center',
    },
    image: {
      width: 210,
      height: 210,
    },
  });

export default createStyles;
