import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';
const statusBarHeight = StatusBar.currentHeight;
const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.WHITE,
    },
    contentContainer: {},
    map: {
      width: Dimensions.get('window').width,
      height: statusBarHeight
        ? Dimensions.get('window').height + statusBarHeight
        : Dimensions.get('window').height,
    },
    confirtBtn: {
      alignSelf: 'center',
    },
    backView: {
      backgroundColor: Colors.BUTTON,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
    },
    bottomPart: {
      backgroundColor: Colors.WHITE,
      height: 179,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: scaleHeightSize(20),
    },
    location: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 13,
      marginBottom: 18,
    },
    textInputContainer: {
      minHeight: 96,
      width: '100%',
      backgroundColor: Colors.WHITE,
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      elevation: 8,
      paddingTop: 50,
    },
    searchButton: {
      height: '100%',
      backgroundColor: Colors.WHITE,
      justifyContent: 'flex-start',
      paddingHorizontal: 5,
    },
    searchButtonContainer: {
      width: '100%',
      paddingHorizontal: 20,
      position: 'absolute',
      top: 111,
      height: 52,
    },
  });

export default createStyles;
