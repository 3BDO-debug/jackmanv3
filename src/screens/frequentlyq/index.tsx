import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import PersonalView from "./view";

interface FrequentlyqProps {
    navigation: NavigationProp<ParamListBase>
}

const Frequentlyq: FC<FrequentlyqProps> = ({ navigation }) => {
    return (
        <PersonalView navigation={navigation} />
    )
}

export default Frequentlyq;