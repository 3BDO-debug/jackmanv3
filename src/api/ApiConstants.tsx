/* App config for apis
 */

export type URLs =
  | 'BASE_URL'
  | 'SIGN_IN'
  | 'VERIFY'
  | 'VERIFY_OTP'
  | 'FACEBOOK'
  | 'GOOGLE'
  | 'MANUFACTURER'
  | 'SIGN_UP'
  | 'LOGOUT'
  | 'CARS'
  | 'ADD_CAR'
  | 'REMOVE_CAR'
  | 'GET_USER_DATA'
  | 'UPDATE_USER'
  | 'GET_DEALERS'
  | 'GET_CLOSED_DAYS'
  | 'BOOK'
  | 'GET_CAR_HISTORY'
  | 'UPDATE_CAR'
  | 'RESET_PASSWORD';

const ApiConstants = {
  BASE_URL: 'https://jackman.herokuapp.com/api/v1/',
  SIGN_IN: 'user/auth/signin',
  VERIFY: 'user/auth/verify',
  VERIFY_OTP: 'user/auth/verifyotp',
  FACEBOOK: 'user/auth/facebook',
  GOOGLE: 'user/auth/google',
  MANUFACTURER: 'manufacturer/get',
  SIGN_UP: 'user/auth/signup',
  LOGOUT: 'user/auth/logout',
  CARS: 'car/myCars',
  ADD_CAR: 'car/add',
  REMOVE_CAR: 'car/remove',
  GET_USER_DATA: 'user/auth/get',
  UPDATE_USER: 'user/auth/update',
  GET_DEALERS: 'manufacturer/getDealers',
  GET_CLOSED_DAYS: 'dealer/closingDays',
  BOOK: 'booking/book',
  GET_CAR_HISTORY: 'booking/myBookings',
  UPDATE_CAR: 'car/updateMyCar',
  RESET_PASSWORD: 'user/auth/resetPassword',
};

export default ApiConstants;
