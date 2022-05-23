import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
       paddingHorizontal: 20,
      flex: 1,
      paddingTop: 100,
    },
    contentContainer: {
      paddingTop: 50,
      flex: 1,
    },
    logo: {
      alignSelf: 'center',
    },
    Btn: {
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
    stepsContainer: {
      paddingHorizontal: 30,
    },
    stepsViewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepView: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      height: 2,
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: Colors.WHITE,
      alignSelf: 'flex-start',
      marginTop: 19,
    },
    stepTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stepContainer: {
      alignItems: 'center',
    },
    cardContainer: {
      backgroundColor: Colors.WHITE,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 25,
      borderRadius: 20,
      marginTop: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardBody: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      justifyContent: 'space-between',
    },
    inputContaier: {
      height: 25,
      marginLeft: 10,
      flex: 1,
    },
    input: {
      backgroundColor: Colors.WHITE_GRAY,
      height: 25,
      borderRadius: 10,
      fontSize: 10,
      paddingLeft: 10,
    },
    rowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
      // backgroundColor: 'red',
    },
    textItem: {
      marginLeft: 10,
      flex: 1,
    },
    location: {
      marginLeft: 10,
      flex: 1,
    },
    rightText: {
      flex: 0.54,
    },
  });

export default createStyles;
