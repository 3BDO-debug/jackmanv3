import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { scaleHeightSize } from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      paddingBottom: 84,
    },
    contentContainer: {
      paddingBottom: 74,
    },
    picker: {
      flex: 1,
      marginTop: 10,
      width: '100%',
      justifyContent: 'center',
      height: 400,
    },
    text: {
      color: Colors.WHITE,
      fontFamily: 'Poppins-Regular',
    },
    viewContainer: {
      width: '100%',
      backgroundColor: Colors.BUTTON,
      marginTop: 20,
      borderRadius: 20,
      paddingBottom: 20,
    },
    confirtBtn: {
      marginTop: 38,
    },
    separator: {
      height: 30,
    },
    timeList: {
      height: 150,
      flex: 1,
    },
  });
export default createStyles;
