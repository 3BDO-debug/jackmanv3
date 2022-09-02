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
            alignSelf: 'center'
        },
        textInput: {
            flex: 1,
            marginHorizontal: 10,
            borderRadius: 20,
        },
        input: {
            fontSize: 22,
            textAlign: "center",
            height: '100%',
        },
        verifyInputView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: scaleHeightSize(57),
            marginTop: scaleHeightSize(51)
        },
        error: {
            alignSelf: 'center',
            marginTop: scaleHeightSize(40)
        }
    });

export default createStyles;