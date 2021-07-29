import axios from 'axios';
import Toasters from '../components/popUp/PopUp';
import { StorageService } from '../utils/utils';
import AuthorizationUser from '../models/AuthorizationUser';
import Error from '../models/service/Error';

const client = axios.create({
  baseURL: 'https://areatrout.demohoster.com',
});

const processError = (error: Error, message?: string) => {
  if (message) {
    return Toasters.error(message);
  }
  return Toasters.error(
    error.response.data.StatusText || 'Произошла непредвиденная ошибка, пожалуйста, попробуйте ещё раз'
  );
};

export { client, processError };