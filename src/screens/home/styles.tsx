import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize, scaleWidthSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      borderRadius: 20,
      flex: 1,
    },
    contentContainer: {
      //   paddingTop: 50,
    },
    logo: {
      alignSelf: 'center',
    },
    input: {
      fontSize: 11,
    },
    Btn: {
      paddingLeft: 34,
      marginTop: 37,
      marginBottom: 30,
    },
    estimateContainer: {
      backgroundColor: Colors.WHITE,
      paddingTop: 18,
      paddingBottom: 11,
      paddingHorizontal: 42,
      borderRadius: 20,
      marginTop: 29,
      marginBottom: 34,
    },
    estimateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 23,
    },
    timeElement: {
      alignItems: 'center',
    },
    carListHeader: {
      flexDirection: 'row',
    },
    addCarBtn: {
      marginLeft: 16,
    },
    helloText: {
      marginTop: 36,
      width: scaleWidthSize(250),
    },
    hideItemContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: scaleHeightSize(20),
      paddingTop: scaleHeightSize(10),
    },
    hiddenBtn: {
      backgroundColor: 'red',
      height: 50,
      width: 50,
      paddingHorizontal: scaleHeightSize(5),
      borderRadius: 10,
      alignItems: 'center',
    },
    seperator: {
      height: scaleHeightSize(10),
    },
    menu: {
      width: 40,
      height: 40,
      backgroundColor: 'red',
      alignSelf: 'flex-end',
    },
    noCars: {
      alignSelf: 'center',
      opacity: 0.3,
    },
  });

export default createStyles;
