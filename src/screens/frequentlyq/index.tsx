import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import PersonalView from "./view";
import Screen from "../../components/Screen";

interface FrequentlyqProps {
    navigation: NavigationProp<ParamListBase>
}

const Frequentlyq: FC<FrequentlyqProps> = ({ navigation }) => {
    return (
        <Screen navigation={navigation} hideFooter>
            <PersonalView />
        </Screen>
    )
}

export default Frequentlyq;