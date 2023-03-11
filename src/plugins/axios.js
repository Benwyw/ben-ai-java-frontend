import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api' // replace with your backend API URL
});

export default instance;