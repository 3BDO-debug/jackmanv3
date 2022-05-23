import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import RegisterView from './view';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {DESABLE_LOADER, FETCH, SET_MANUFACTURER} from '../../redux/actionTypes';
import payload from '../../api/payload';
import Loader from '../../components/loader';

interface RegisterCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterCar: FC<RegisterCarProps> = ({navigation}) => {
  const loading = useSelector(
    (state: RootStateOrAny) => state.MainState.loading,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('(((');
    dispatch({
      type: FETCH,
      payload: payload({
        actionType: 'FETCH',
        nextAction: SET_MANUFACTURER,
        serviceUrl: 'MANUFACTURER',
        requestMethod: 'GET',
        load: true,
        urlParams: '?page=1',
      }),
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: DESABLE_LOADER,
    });
  }, []);
  return (
    <>
      <RegisterView navigation={navigation} />
      {loading && <Loader />}
    </>
  );
};

export default RegisterCar;
