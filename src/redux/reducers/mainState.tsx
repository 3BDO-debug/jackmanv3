import {
  CAR_UPDATED,
  CLEAR_MESSAGE_ERROR,
  DESABLE_LOADER,
  ENABLE_LOADER,
  LOGOUT,
  SET_BOOKING_PERSONAL_DATA,
  SET_CARS,
  SET_CAR_HISTORY,
  SET_CAR_SERVICE,
  SET_CAR_TYPE,
  SET_CLOSED_DAYS,
  SET_CURRENT_TOKEN,
  SET_DEALER,
  SET_LOCATION,
  SET_MANUFACTURER,
  SET_OTP_ERROR,
  SET_PHONE,
  SET_SELECTED_CAR,
  SET_TOKEN,
  SET_USER_DATA,
} from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  refreshToken: null,
  loading: false,
  phon: '',
  manufacturer: [],
  location: {},
  registerationError: '',
  messageError: '',
  phonMessageError: '',
  cars: [],
  selectedCar: {},
  userData: {},
  dealers: [],
  closedDays: [],
  carDetails: {},
  carService: null,
  bookinPersonalData: {},
  carHistory: [],
  phoneToken: '',
  carUpdated: false,
};

const MainState = (state = initialState, action: any) => {
  switch (action.type) {
    case ENABLE_LOADER:
      return {...state, loading: true};
    case DESABLE_LOADER:
      return {...state, loading: false};
    case SET_PHONE: {
      if (action.error) {
        return {...state, phoneMessageError: action.data};
      }
      return {...state, phone: action.data, messageError: ''};
    }
    case SET_OTP_ERROR: {
      console.log('>>>>>', action);

      if (action.error) return {...state, messageError: action.data};

      return {...state, messageError: '', phoneToken: action.data};
    }
    case SET_MANUFACTURER:
      return {...state, manufacturer: action.data};
    case CLEAR_MESSAGE_ERROR:
      return {...state, messageError: ''};
    case SET_CARS:
      return {...state, cars: action.data, carUpdated: false};
    case SET_CAR_HISTORY:
      return {...state, carHistory: action.data};
    case SET_LOCATION:
      return {...state, location: action.data};
    case SET_CURRENT_TOKEN: {
      return {...state, token: action.data};
    }
    case LOGOUT: {
      AsyncStorage.multiRemove(['token', 'refreshToken']);
      return {...state, token: null};
    }
    case SET_SELECTED_CAR:
      return {...state, selectedCar: action.data};
    case SET_TOKEN: {
      if (action.error) {
        return {...state, messageError: action.data};
      } else {
        AsyncStorage.setItem('token', action.data.token);
        AsyncStorage.setItem('refreshToken', action.data.refreshToken);
        return {
          ...state,
          token: action.data.token,
          refreshToken: action.data.refreshToken,
          messageError: '',
        };
      }
    }
    case SET_USER_DATA:
      return {...state, userData: action.data};
    case SET_DEALER:
      return {...state, dealers: action.data};
    case SET_CLOSED_DAYS:
      return {...state, closedDays: action.data};
    case SET_CAR_TYPE:
      return {...state, carDetails: {...state.carDetails, ...action.data}};
    case SET_CAR_SERVICE:
      return {...state, carService: action.data};
    case SET_BOOKING_PERSONAL_DATA:
      return {...state, bookinPersonalData: action.data};
    case CAR_UPDATED:
      return {...state, carUpdated: true};

    default: {
      return state;
    }
  }
};

export default MainState;
