import { put, call, select } from 'redux-saga/effects';
import { API } from '../../api';
import {
  DESABLE_LOADER,
  ENABLE_LOADER,
  DESABLE_LOAD_DATA,
  ENABLE_LOAD_DATA,
  FETCH,
} from '../actionTypes';
import * as NavigationService from '../../navigation/NavigationService';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export default function* Fetch(action: any): any {
  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    if (!state.isConnected) {
      Alert.alert("Connection error", "A data connection is not currently allowed")
    }
  });
  let currentState = yield select();

  API.setHeader('Accept', 'application/json');

  //   if (action.payload.header) {
  //     API.setHeader(action.payload.header.key, action.payload.header.value);
  //   }

  let token = currentState.MainState.token;

  if (action.payload.setToken) {
    API.setHeader('Authorization', 'Bearer ' + token);
  }
  if (!action.payload.load) {
    yield put({ type: ENABLE_LOADER, data: action.type });
  }

  if (!action.payload.load) {
    yield put({ type: ENABLE_LOAD_DATA, data: action.payload.nextAction });
  }

  let callMethod =
    action.payload.requestMethod == 'POST'
      ? API.post
      : action.payload.requestMethod == 'GET'
        ? API.get
        : action.payload.requestMethod == 'PUT'
          ? API.put
          : action.payload.requestMethod == 'PATCH'
            ? API.patch
            : API.delete;

  const response = yield call(
    callMethod,
    action.payload.serviceUrl +
    (action.payload.urlParams ? action.payload.urlParams : ''),
    action.payload.body ? action.payload.body : {},
  );

  if (action.payload.setToken) {
    API.deleteHeader('Authorization');
  }

  if (!action.payload.load) {
    yield put({ type: DESABLE_LOADER });
  }

  if (!action.payload.load) {
    yield put({ type: DESABLE_LOAD_DATA });
  }

  if (action.payload.clear) {
    yield put({ type: action.payload.nextAction, data: null });
  }

  API.deleteHeader('lang');

  //   if (action.payload.header) {
  //     API.deleteHeader(action.payload.header.key);
  //   }

  try {
    if (response.status == 200 || response.status == 201) {
      if (action.payload.successToast)
        Alert.alert("", action.payload.successToast);

      if (response.data) {
        if (action.payload.nextAction) {
          try {
            if (action.payload.extraData) {
              if (action.payload.nextAction == FETCH)
                yield put({
                  type: action.payload.nextAction,
                  payload: action.payload.extraData,
                });
              else
                yield put({
                  type: action.payload.nextAction,
                  data: action.payload.extraData,
                });
            } else {
              if (response.data.result)
                yield put({
                  type: action.payload.nextAction,
                  data: response.data.result.data,
                });
              else if (response.data.otp)
                yield put({
                  type: action.payload.nextAction,
                  data: response.data.otp,
                });
              else if (response.data.phoneToken)
                yield put({
                  type: action.payload.nextAction,
                  data: response.data.phoneToken,
                });
              else yield put({ type: action.payload.nextAction });
            }
          } catch { }
        }
      }

      if (action.payload.navigateTo) {
        action.payload.navigationType == 'navigate'
          ? NavigationService.navigate(action.payload.navigateTo)
          : NavigationService.reset(action.payload.navigateTo);
      } else if (action.payload.navigationType == 'back') {
        NavigationService.goBack();
      }
    } else {
      if (
        response.status == 422 ||
        response.status == 401 ||
        response.status == 400
      ) {
        if (action.payload.showToast) {
          Alert.alert("", response.data.message);
        }
        if (action.payload.error && action.payload.nextAction != FETCH) {
          yield put({
            type: action.payload.nextAction,
            data: response.data.message,
            error: action.payload.error,
          });
        }
      } else {
      }
    }
  } catch (error) {
    console.log('caaaaaaaatch', error);
  }
}
