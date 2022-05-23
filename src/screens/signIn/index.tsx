import React, {FC, useEffect, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SignInView from './view';
import Loader from '../../components/loader';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {DESABLE_LOADER} from '../../redux/actionTypes';

interface SignInProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn: FC<SignInProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootStateOrAny) => state.MainState.loading,
  );

  useEffect(() => {
    dispatch({
      type: DESABLE_LOADER,
    });
  }, []);
  return (
    <>
      <SignInView navigation={navigation} />
      {loading && <Loader />}
    </>
  );
};

export default SignIn;
