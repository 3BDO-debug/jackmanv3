import React, {FC, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import ChooseCarView from './view';

interface ChooseCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseCar: FC<ChooseCarProps> = ({navigation}) => {
  return <ChooseCarView navigation={navigation} />;
};

export default ChooseCar;
