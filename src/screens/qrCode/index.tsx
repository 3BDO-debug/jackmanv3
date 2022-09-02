import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import QrCodeView from "./view";
import Screen from "../../components/Screen";

interface QrCodeProps {
    navigation: NavigationProp<ParamListBase>
}

const QrCode: FC<QrCodeProps> = ({ navigation }) => {
    return (
        <Screen navigation={navigation}>
            <QrCodeView navigation={navigation} />
        </Screen>
    )
}

export default QrCode;