import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LatestQrView from "./view";

interface LatestQrProps {
    navigation: NavigationProp<ParamListBase>
}

const LatestQr: FC<LatestQrProps> = ({ navigation }) => {
    return (
        <LatestQrView navigation={navigation} />
    )
}

export default LatestQr;