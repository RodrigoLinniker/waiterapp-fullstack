import axios from 'axios';

const {URL} = process.env;

const api = axios.create({
  baseURL: URL,
});

export default api;