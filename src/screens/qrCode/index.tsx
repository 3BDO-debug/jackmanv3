import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import QrCodeView from "./view";

interface QrCodeProps {
    navigation: NavigationProp<ParamListBase>
}

const QrCode: FC<QrCodeProps> = ({ navigation }) => {
    return (
        <QrCodeView navigation={navigation} />
    )
}

export default QrCode;