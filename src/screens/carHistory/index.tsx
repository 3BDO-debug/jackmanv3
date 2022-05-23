import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CarHistoryView from "./view";

interface CarHistoryProps {
    navigation: NavigationProp<ParamListBase>
}

const CarHistory: FC<CarHistoryProps> = ({ navigation }) => {
    return (
        <CarHistoryView navigation={navigation} />
    )
}

export default CarHistory;