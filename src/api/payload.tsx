import * as React from 'react';

import {ActionTypes} from '../redux/actionTypes';
import * as types from '../redux/actionTypes';

import ApiConstants from './ApiConstants';
import {URLs} from './ApiConstants';

export type Props = {
  serviceUrl: URLs;
  actionType: ActionTypes;
  requestMethod: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Object; //for post body
  urlParams?: String; //for get params
  navigationType?: 'reset' | 'navigate' | 'back';
  navigateTo?: String;
  setToken?: boolean;
  extraData?: any;
  nextAction?: ActionTypes;
  load?: boolean;
  showToast?: boolean;
  successToast?: string;
  clear?: boolean;
  error?: boolean;
  header?: JSON;
};

function payload(props: Props) {
  if (checkErrors(props)) {
    let serviceUrl = getUrl(props.serviceUrl);
    let actionType = getType(props.actionType);
    let requestMethod = props.requestMethod
      ? props.requestMethod.toUpperCase()
      : props.requestMethod;
    let body = props.body ? props.body : null;
    let urlParams = props.urlParams ? props.urlParams : null;
    let navigationType = props.navigationType
      ? props.navigationType.toLowerCase()
      : 'navigate';
    let navigateTo = props.navigateTo ? props.navigateTo : null;
    let successToast = props.successToast ? props.successToast : null;
    let setToken = props.setToken ? props.setToken : false;
    let load = props.load ? props.load : false;
    let showToast = props.showToast ? props.showToast : false;
    let clear = props.clear ? props.clear : false;
    let error = props.error ? props.error : false;
    let extraData = props.extraData ? props.extraData : null;
    let nextAction = props.nextAction ? props.nextAction : null;
    let header = props.header ? props.header : null;

    return {
      serviceUrl,
      actionType,
      requestMethod,
      body,
      urlParams,
      navigationType,
      navigateTo,
      setToken,
      extraData,
      nextAction,
      header,
      load,
      showToast,
      clear,
      error,
      successToast,
    };
  }
}

function getAllApiConstants() {
  var keys = '';
  let flag = false;
  for (var key in ApiConstants) {
    flag = true;
    keys += '\n' + key;
    keys += ',';
  }

  if (flag) {
    keys += '||';
    keys = keys.replace(',||', '\n ');
  }

  return keys;
}

function getAllTypes() {
  var keys = '';
  let flag = false;
  for (var key in types) {
    flag = true;
    keys += '\n' + key;
    keys += ',';
  }

  if (flag) {
    keys += '||';
    keys = keys.replace(',||', '\n ');
  }

  return keys;
}

function getUrl(key: URLs) {
  return ApiConstants[key];
}

function getType(key: ActionTypes) {
  return types[key];
}

function checkErrors(props: any) {
  let serviceUrl = props.serviceUrl;
  let actionType = props.actionType;
  let requestMethod = props.requestMethod
    ? props.requestMethod.toUpperCase()
    : null;
  let navigationType = props.navigationType
    ? props.navigationType.toLowerCase()
    : null;

  if (!serviceUrl) {
    console.error('serviceUrl is required');
    return false;
  } else {
    if (getUrl(serviceUrl) == null) {
      console.error(
        "Invalid serviceUrl '" +
          props.serviceUrl +
          "'. should be one of: (" +
          getAllApiConstants() +
          ')',
      );
      return false;
    }
  }

  if (!actionType) {
    console.error('actionType is required');
    return false;
  } else {
    if (getType(actionType) == null) {
      console.error(
        "Invalid actionType '" +
          props.actionType +
          "'. should be one of: (" +
          getAllTypes() +
          ')',
      );
      return false;
    }
  }

  if (!requestMethod) {
    console.error('requestMethod is required');
    return false;
  } else {
    if (
      requestMethod == 'POST' ||
      requestMethod == 'GET' ||
      requestMethod == 'PUT' ||
      requestMethod == 'DELETE' ||
      requestMethod == 'PATCH'
    ) {
    } else {
      console.error(
        "Invalid requestMethod '" +
          props.requestMethod +
          "'. should be one of: (\nPOST,\nGET,\nPUT,\nPATCH,\nDELETE\n )",
      );
      return false;
    }
  }

  if (
    navigationType &&
    (navigationType == 'navigate' ||
      navigationType == 'reset' ||
      navigationType == 'back')
  ) {
  } else if (!navigationType) {
    return true;
  } else {
    console.error(
      "Invalid navigationType '" +
        props.navigationType +
        "'. should be one of: (\nnavigate,\nreplace,\nback\n )",
    );
    return false;
  }

  return true;
}

export default payload;
