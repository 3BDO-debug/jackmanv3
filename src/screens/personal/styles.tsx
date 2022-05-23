import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { scaleHeightSize } from "../../styles/mixins";

const createStyles = () =>
    StyleSheet.create({
        container: {
            backgroundColor: Colors.BACKGROUND,
            paddingHorizontal: 20,
            paddingBottom: 74
        },
        contentContainer: {
            paddingBottom: 74
        },
        logo: {
            alignSelf: 'center'
        },
        input: {
            fontSize: 11,
        },
        confirtBtn: {
            marginTop: 38
        },
        nameInput: {
            marginTop: 36
        },
        inputContainer: {
            marginBottom: 25
        },
        birthAndOccupationContainer: {
            flexDirection: 'row',
            alignItems: "flex-start"
        },
        smallInputContainer: {
            flex: 1
        },
        birth: {
            marginRight: 17
        },
        locationBtn: {
            backgroundColor: Colors.WHITE,
            justifyContent: 'flex-start',
            paddingLeft: 18,
            marginBottom: 25,
            height: scaleHeightSize(52)
        },
        dropDownContainer: {
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
            marginBottom: 20
        },
        dropDown: {
            width: "100%",
            borderRadius: 20,
            // marginBottom: 20,
            backgroundColor: Colors.WHITE,
            height: scaleHeightSize(52),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20
        },
        line: {
            backgroundColor: Colors.PLACEHOLDER,
            width: '100%',
            height: .5
        },
        carList: {
            maxHeight: 170,
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
        },
        textDate: {
            marginLeft: 20
        },
        butDate: {
            flex: 1,
            marginRight: 20,
            backgroundColor: "white",
            borderRadius: 20,
            height: scaleHeightSize(52),
            justifyContent: 'center'
        }
    });

export default createStyles;