import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      flex: 1,
      height: '100%',
      backgroundColor: Colors.BACKGROUND,
    },
    contentContainer: {
      backgroundColor: Colors.BACKGROUND,
    },
    input: {
      fontSize: 11,
    },
    confirtBtn: {
      marginTop: scaleHeightSize(38),
    },
    nameInput: {
      marginTop: scaleHeightSize(36),
    },
    inputContainer: {
      marginBottom: scaleHeightSize(25),
    },
    birthAndOccupationContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    smallInputContainer: {
      flex: 1,
    },
    birth: {
      marginRight: 17,
    },
    locationBtn: {
      backgroundColor: Colors.WHITE,
      justifyContent: 'flex-start',
      paddingLeft: 18,
      marginBottom: scaleHeightSize(25),
      height: 52,
    },
    text: {
      paddingTop: scaleHeightSize(120),
      marginBottom: scaleHeightSize(36),
    },
    button: {
      alignItems: 'center',
      marginTop: scaleHeightSize(10),
    },
    buttTextt: {
      color: Colors.WHITE,
      fontSize: 14,
      fontFamily: 'Poppins-Bold',
      lineHeight: 17,
    },
    buttAlert: {
      color: Colors.WHITE,
      fontFamily: 'Poppins-Medium',
      marginTop: scaleHeightSize(20),
      fontSize: 10,
      textDecorationLine: 'underline',
    },
    textAlert: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Poppins-Bold',
    },
    alertContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255, .5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    alert: {
      backgroundColor: 'black',
      height: scaleHeightSize(99),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 20,
    },
    dropDownContainer: {
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
      marginBottom: 20,
    },
    dropDown: {
      width: '100%',
      borderRadius: 20,
      // marginBottom: 20,
      backgroundColor: Colors.WHITE,
      height: scaleHeightSize(52),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    carList: {
      maxHeight: 170,
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
    },
    line: {
      backgroundColor: Colors.PLACEHOLDER,
      width: '100%',
      height: 0.5,
    },
    carModelContainer: {
      width: '48%',
      backgroundColor: Colors.WHITE,
      borderRadius: 20,
      marginBottom: 20,
    },
    carModelDropDown: {
      borderRadius: 20,
      backgroundColor: Colors.WHITE,
      height: scaleHeightSize(52),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  });

export default createStyles;
