import axios from 'axios';
import { LoginResponse } from '../types';
const baseUrl = 'http://localhost:3001/api/login';

const postLogin = async (credentials) => {
  const response = await axios.post<LoginResponse>(baseUrl, credentials);
  return response.data;
};

export default {
  postLogin,
};
