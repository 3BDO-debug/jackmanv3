import React, { FC, useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import EditCarView from './view';
import { useDispatch } from 'react-redux';
import { FETCH, SET_MANUFACTURER } from '../../redux/actionTypes';
import payload from '../../api/payload';

interface EditCarCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditCarCar: FC<EditCarCarProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: FETCH,
      payload: payload({
        actionType: 'FETCH',
        nextAction: SET_MANUFACTURER,
        serviceUrl: 'MANUFACTURER',
        requestMethod: 'GET',
        urlParams: '?page=1',
      }),
    });
  }, []);



  return <EditCarView route={route} navigation={navigation} />;
};

export default EditCarCar;
