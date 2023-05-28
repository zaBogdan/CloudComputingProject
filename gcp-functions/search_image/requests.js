const axios = require('axios');

const createApiConfig = () => {
  const axiosConfig = {
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'X-Powered-By': 'Express',
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

exports.getRequest = (data) => {
  return httpService.get(`http://34.31.18.234:8080/meme?image=${data}`);
}