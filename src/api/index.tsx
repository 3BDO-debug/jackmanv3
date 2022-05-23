import { create } from 'apisauce';
import ApiConstants from "./ApiConstants"
// define the api



export const API = create({
  baseURL: ApiConstants.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
API.addMonitor(() => {
});
