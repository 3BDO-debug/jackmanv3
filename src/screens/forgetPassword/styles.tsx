import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
    },
    contentContainer: {},

    input: {
      fontSize: 11,
    },
    loginBtn: {
      marginTop: 247,
    },
    emailInput: {
      marginBottom: 21,
      marginTop: 34,
    },
  });

export default createStyles;
