import axios from 'axios';
import { API_URL } from 'src/constants/api';

const createApiConfig = () => {
  const axiosConfig = {
    baseURL: API_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  };
  return axiosConfig;
};

axios.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line
  (error) => console.log(error),
);

const httpService = axios.create(createApiConfig());

export default httpService;