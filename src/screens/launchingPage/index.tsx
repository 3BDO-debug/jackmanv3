import React, { FC, useContext, useEffect, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import LaunchingPageView from './view';
import Loader from '../../components/loader';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { DESABLE_LOADER, FETCH, SET_TOKEN } from '../../redux/actionTypes';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import * as Keychain from 'react-native-keychain';
import * as Facebook from 'expo-facebook';
import useGoogleLogin from '../../hooks/useGoogleLogin';
import AsyncStorage from "@react-native-async-storage/async-storage";



interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const LaunchingPage: FC<IProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const [loadingGoogleLogin, promptGoogleLogin] = useGoogleLogin();



  useEffect(() => {
    dispatch({
      type: DESABLE_LOADER,
    });
  }, []);

  const signGoogle = () => {


    promptGoogleLogin();

  };

  const singFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '337851891519808',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['email', 'public_profile'],
        });


      if (type === 'success') {

        await publicAxios.get(`/user/auth/facebook?access_token=${token}`).then(async (response) => {
          authContext.setAuthState({
            accessToken: response.data.result.data.token,
            refreshToken: response.data.result.data.refreshToken,
            authenticated: true,
          });
          await AsyncStorage.setItem("accessToken", response.data.result.data.token);
          await AsyncStorage.setItem("refreshToken", response.data.result.data.refreshToken);
          
        });

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
    }

  };

  const loading = useSelector(
    (state: RootStateOrAny) => state.MainState.loading,
  );

  return (
    <>
      <LaunchingPageView
        signGoogle={signGoogle}
        singFacebook={singFacebook}
        navigation={navigation}
        route={route}
      />
      {loading && <Loader />}
    </>
  );
};

export default LaunchingPage;
