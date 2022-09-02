import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      flex: 1,
      marginTop:40
    },
    contentContainer: {},
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
    helloText: {},
    carText: {
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
      paddingVertical: 10,
      alignSelf: 'center',
      paddingHorizontal: 45,
      marginTop: scaleHeightSize(35),
    },
    backToMain: {
      alignSelf: 'center',
      marginTop: scaleHeightSize(90),
      marginBottom: scaleHeightSize(90),
    },
  });

export default createStyles;
