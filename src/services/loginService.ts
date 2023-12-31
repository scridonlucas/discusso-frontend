import axios from 'axios';
import { LoginResponse, LoginUser } from '../types';
const baseUrl = 'http://localhost:3001/api/login';

const postLogin = async (credentials: LoginUser) => {
  const response = await axios.post<LoginResponse>(baseUrl, credentials);
  return response.data;
};

export default {
  postLogin,
};
