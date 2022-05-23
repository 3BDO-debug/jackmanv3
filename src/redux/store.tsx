import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga'
import Saga from './saga';

const sagaMiddleware = createSagaMiddleware()
export default createStore(
    rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(Saga)
