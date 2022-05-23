import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import VerificationView from './view';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader';
import {DESABLE_LOADER} from '../../redux/actionTypes';

interface VerificationProps {
  navigation: NavigationProp<ParamListBase>;
}

const Verification: FC<VerificationProps> = ({navigation}) => {
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
      <VerificationView navigation={navigation} />
      {loading && <Loader />}
    </>
  );
};

export default Verification;
