import axios from 'axios';
import { handleError } from './errorHandler';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export default api;
