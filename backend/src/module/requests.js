const axios = require('axios');
const services = require('../constants/services');

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

exports.getRequest = (service, url, data) => {
  return httpService.get(`${services[service]}${url}`, data, {
  });
}

exports.postRequest = (service, url, data) => {
    return httpService.post(`${services[service]}${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
}

exports.putRequest = (service, url, data) => {
  return httpService.put(`${services[service]}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
  });
}