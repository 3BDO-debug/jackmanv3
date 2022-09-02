import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ChooseServiseView from "./view";
import Screen from "../../components/Screen";

interface ChooseServiseProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ChooseServise: FC<ChooseServiseProps> = ({ route, navigation }) => {
  return (
    <Screen navigation={navigation} hideFooter>
      <ChooseServiseView navigation={navigation} route={route} />
    </Screen>
  );
};

export default ChooseServise;
