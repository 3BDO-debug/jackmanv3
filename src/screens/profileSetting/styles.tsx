import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
    },
    text: {
      alignSelf: 'center',
      marginTop: scaleHeightSize(28),
    },
    bodyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeAndHistory: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    block: {
      marginBottom: scaleHeightSize(37),
    },
    textInput: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      padding: 0,
      width: '80%',
      color: Colors.WHITE,
      textAlign: 'left',
    },
  });
export default createStyles;
