import React, {FC, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AdditionalInformationView from './view';

interface AdditionalInformationProps {
  navigation: NavigationProp<ParamListBase>;
}

const AdditionalInformation: FC<AdditionalInformationProps> = ({
  navigation,
}) => {
  return <AdditionalInformationView navigation={navigation} />;
};

export default AdditionalInformation;
