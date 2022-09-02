import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ChooseCarView from "./view";
import Screen from "../../components/Screen";

interface ChooseCarProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ChooseCar: FC<ChooseCarProps> = ({ route, navigation }) => {
  return <ChooseCarView navigation={navigation} route={route} />;
};

export default ChooseCar;
