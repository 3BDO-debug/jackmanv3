import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { scaleHeightSize } from '../../styles/mixins';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      flex: 1,
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
    textCenter: {
      alignSelf: 'center',
    },
    dataAndTime: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scaleHeightSize(30),
    },
    txtAndIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 10,
    },
    line: {
      height: '100%',
      width: 1,
      backgroundColor: Colors.PLACEHOLDER,
    },
    qrContainer: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingVertical: scaleHeightSize(20),
    },
    image: {
      width: 210,
      height: 210,
    },
    requestedDateContainer: {
      paddingHorizontal: 30
    },
    requestedDateContainerTitle: {
      fontFamily: "Poppins-Bold",
      fontSize: 20
    },
    requestedDateContainerBody: {
      fontFamily: "Poppins-Medium",
      fontSize: 15
    }
  });

export default createStyles;
