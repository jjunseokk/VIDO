import axios from 'axios';

const AxiosConfig = axios.create({
  headers: {
    // 'Access-Control-Allow-Origin': 'https://office.vers.kr:8080',
    // 'Access-Control-Allow-Origin': 'https://192.168.0.63:8080',
    'Access-Control-Allow-Origin': import.meta.env.VITE_BASE_URL,
    // 'Access-Control-Allow-Origin': 'https://vido.gallery:8443',
    'Access-Control-Allow-Credentials': true,
  },
  // baseURL: 'https://office.vers.kr:8080',
  // baseURL: 'https://192.168.0.63:8080',
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://vido.gallery:8443',
  withCredentials: true,
  crossDomain: true,
  SameSite: 'None',
  Secure: true,
});

export default AxiosConfig;
