import axios from 'axios';
import { LoginUser } from '../types/userTypes';
import {
  LoginResponse,
  LogoutResponse,
  AuthResponse,
} from '../types/authTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth`
  : 'http://localhost:3001/api/auth';

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
