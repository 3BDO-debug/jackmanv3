import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import PersonalView from './view';
import {FETCH, SET_MANUFACTURER} from '../../redux/actionTypes';
import {useDispatch} from 'react-redux';
import payload from '../../api/payload';

interface PersonalProps {
  navigation: NavigationProp<ParamListBase>;
  route: NavigationRoute<ParamListBase>;
}

const Personal: FC<PersonalProps> = ({navigation, route}) => {
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
  return <PersonalView navigation={navigation} route={route} />;
};

export default Personal;
