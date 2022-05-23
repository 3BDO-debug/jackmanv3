import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      flex: 1,
    },
    contentContainer: {
      // paddingBottom: 74
    },
    logo: {
      alignSelf: 'center',
    },
    confirtBtn: {
      marginTop: scaleHeightSize(18),
    },
    carListHeader: {
      flexDirection: 'row',
    },
    addCarBtn: {
      marginLeft: 16,
    },
    text: {
      alignSelf: 'center',
      marginTop: scaleHeightSize(18),
    },
    circle: {
      width: scaleHeightSize(92),
      height: scaleHeightSize(92),
      borderRadius: 92 / 2,
      backgroundColor: Colors.WHITE,
      marginTop: scaleHeightSize(80),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    historyBtn: {
      marginLeft: 1,
    },
    buttons: {
      alignItems: 'center',
    },
    button1: {
      flex: 1,
    },
    button2: {
      flex: 1.3,
    },
    listContainer: {
      maxHeight: scaleHeightSize(280),
    },
    tapsContainer: {
      flexDirection: 'row',
      marginBottom: scaleHeightSize(39),
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '60%',
    },
    seperator: {
      height: scaleHeightSize(10),
    },
    noCars: {
      alignSelf: 'center',
      opacity: 0.3,
    },
  });

export default createStyles;
