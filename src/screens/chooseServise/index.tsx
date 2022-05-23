import React, {FC} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import ChooseServiseView from './view';

interface ChooseServiseProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseServise: FC<ChooseServiseProps> = ({navigation}) => {
  return <ChooseServiseView navigation={navigation} />;
};

export default ChooseServise;
