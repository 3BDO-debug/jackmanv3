import { takeEvery } from 'redux-saga/effects'
import Fetch from './fetch';
import {  FETCH } from '../actionTypes';

function* Saga() {
  yield takeEvery(FETCH, Fetch);
}



export default Saga;