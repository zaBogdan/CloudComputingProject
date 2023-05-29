import axios from 'axios';
import { useAuth } from 'src/hooks/use-auth';
import { API_URL } from 'src/constants/api';

const createApiConfig = () => {
  console.log(API_URL)
  const axiosConfig = {
    baseURL: API_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
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