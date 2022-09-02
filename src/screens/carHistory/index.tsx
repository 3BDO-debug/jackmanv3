import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CarHistoryView from "./view";
import Screen from "../../components/Screen";

interface CarHistoryProps {
    navigation: NavigationProp<ParamListBase>;

}

const CarHistory: FC<CarHistoryProps> = ({ navigation }) => {
    return (
        <Screen navigation={navigation} hideFooter>
            <CarHistoryView navigation={navigation} />
        </Screen>
    )
}

export default CarHistory;