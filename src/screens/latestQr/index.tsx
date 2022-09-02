import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LatestQrView from "./view";
import Screen from "../../components/Screen";

interface LatestQrProps {
    navigation: NavigationProp<ParamListBase>
}

const LatestQr: FC<LatestQrProps> = ({ navigation }) => {
    return (
        <Screen navigation={navigation}>
            <LatestQrView navigation={navigation} />
        </Screen>
    )
}

export default LatestQr;