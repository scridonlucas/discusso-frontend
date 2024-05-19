import axios from 'axios';
import { LoginResponse, LoginUser, LogoutResponse } from '../types';
import { AuthResponse } from '../types';

const baseUrl = 'http://localhost:3001/api/auth';
const loginPath = '/login';
const logoutPath = '/logout';
const authPath = '/verify';

const postLogin = async (credentials: LoginUser) => {
  const response = await axios.post<LoginResponse>(
    baseUrl + loginPath,
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getLogout = async () => {
  const response = await axios.get<LogoutResponse>(baseUrl + logoutPath, {
    withCredentials: true,
  });
  return response.data;
};

const getAuth = async () => {
  const response = await axios.get<AuthResponse>(baseUrl + authPath, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  postLogin,
  getAuth,
  getLogout,
};
