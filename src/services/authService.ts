import axios from 'axios';
import { AuthResponse } from '../types';

const baseUrl = 'http://localhost:3001/api/auth';

const getAuth = async () => {
  const response = await axios.get<AuthResponse>(baseUrl, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getAuth,
};
