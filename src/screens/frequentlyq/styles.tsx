import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const createStyles = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            // backgroundColor: Colors.BACKGROUND,
            paddingHorizontal: 20,
            paddingBottom: 74,

        },

        text: {
            marginTop: 0,



        },
        text2: {
            marginBottom: 50
        },
        text3: {
            marginBottom: 30,
            paddingLeft: 20,
        },
        locationBtn: {
            backgroundColor: Colors.WHITE,
            justifyContent: 'space-between',
            paddingLeft: 18,
            marginBottom: 25,
            height: 52,

        },
        btn: {
            marginBottom: .1,
        },
        view: {
            backgroundColor: Colors.WHITE,
            marginBottom: 25,
            borderRadius: 20,


        },
        icon: {
            marginRight: 10,

        }

    })

export default createStyles;