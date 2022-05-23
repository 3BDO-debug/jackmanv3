import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      paddingBottom: 74,
    },
    contentContainer: {
      paddingBottom: 74,
    },
    logo: {
      alignSelf: 'center',
    },
    input: {
      fontSize: 11,
    },
    confirtBtn: {
      marginTop: 38,
    },
    nameInput: {
      marginTop: 36,
    },
    inputContainer: {
      marginBottom: 25,
    },
    viewText: {
      backgroundColor: Colors.WHITE,
      height: 147,
      borderRadius: 20,
      marginBottom: 25,
    },
  });

export default createStyles;
