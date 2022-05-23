import React, { FC, useEffect, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import HomeView from './view';
import { useDispatch } from 'react-redux';
import { FETCH, SET_CARS, SET_USER_DATA } from '../../redux/actionTypes';
import payload from '../../api/payload';

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const Home: FC<HomeProps> = ({ route, navigation }) => {

  return <HomeView route={route} navigation={navigation} />;
};

export default Home;
