import React, { FC, useEffect, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import SignInView from './view';
import Loader from '../../components/loader';

interface SignInProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn: FC<SignInProps> = ({ navigation }) => {



  return (
    <>
      <SignInView navigation={navigation} />

    </>
  );
};

export default SignIn;
