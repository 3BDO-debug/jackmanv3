import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';
import {scaleHeightSize} from '../../styles/mixins';
const {width: screenWidth} = Dimensions.get('window');

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.BACKGROUND,
      paddingHorizontal: 20,
      flex: 1,
      paddingTop: 100,
      // paddingBottom: 40,
    },
    contentContainer: {
      paddingTop: 50,
    },
    confirtBtn: {
      // marginTop: 450,
    },
    item: {
      width: screenWidth - 280,
      height: screenWidth - 270,
    },
    imageContainer: {
      flex: 1,
      //marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    carousel: {
      marginTop: 20,
    },
  });
export default createStyles;
