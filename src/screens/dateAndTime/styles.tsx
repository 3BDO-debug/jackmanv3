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
      marginTop: -7,
    },
    separator: {
      height: 30,
    },
    timeList: {
      height: 150,
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }

  });
export default createStyles;
