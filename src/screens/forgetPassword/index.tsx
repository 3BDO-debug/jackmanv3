import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ForgetPasswordView from "./view";

interface ForgetPasswordProps {
    navigation: NavigationProp<ParamListBase>
}

const ForgetPassword: FC<ForgetPasswordProps> = ({ navigation }) => {
    return (
        <ForgetPasswordView navigation={navigation} />
    )
}

export default ForgetPassword;