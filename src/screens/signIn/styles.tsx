import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { scaleHeightSize } from "../../styles/mixins";

const createStyles = () =>
    StyleSheet.create({
        container: {
            backgroundColor: Colors.BACKGROUND,
            paddingHorizontal: 20,
            paddingBottom: scaleHeightSize(74)
        },
        contentContainer: {
            paddingBottom: scaleHeightSize(74)
        },
        logo: {
            alignSelf: 'center',
            marginBottom: scaleHeightSize(55),
            marginTop: scaleHeightSize(109)
        },
        input: {
            fontSize: 11,
        },
        textWithButtonContainer: {
            flexDirection: 'row',
            paddingTop: 7,
            alignItems: 'center',
            justifyContent: 'center'
        },
        loginBtn: {
            paddingLeft: 34,
            marginTop: scaleHeightSize(104)
        },
        emailInput: {
            marginBottom: scaleHeightSize(21),
            marginTop: scaleHeightSize(46)
        },
        forgetBtn: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingBottom: scaleHeightSize(15),
            paddingTop: 5,
        },
        error: {
            alignSelf: 'center'
        }
    });

export default createStyles;