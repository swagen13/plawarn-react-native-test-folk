import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

// Set config defaults when creating the instance
const _axios = axios.create({
  baseURL: API_URL,
});

_axios.defaults.headers.common.Authorization = '';

// axios request interceptor
_axios.interceptors.request.use(
  function (config) {
    if (config.headers) {
      // add x-custom-lang before sending request
      config.headers['x-custom-lang'] = 'th';
    }

    // log axios request url and method
    console.log(
      `Axios Reqest: ${config.method?.toUpperCase()} ${API_URL} ${config.url}`
    );

    // log axios request payload
    if (config.data) {
      console.log(`Axios Request Payload: ${JSON.stringify(config.data)}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(function (response) {
  // log axios response data
  console.log(`Axios Response: ${JSON.stringify(response.data)}`);

  return response;
});

export default _axios;
