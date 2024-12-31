import axios from 'axios';
import { User, NewUser } from '../types/userTypes';
import { Exists } from '../types/authTypes';

const baseUrl =
  `${import.meta.env.VITE_API_URL}/users` || 'http://localhost:3001/api/users';

const getUsers = async () => {
  const response = await axios.get<User[]>(baseUrl);
  return response.data;
};

const postUser = async (credentials: NewUser) => {
  const response = await axios.post<NewUser>(baseUrl, credentials);
  return response.data;
};

const checkUsername = async (username: string) => {
  const response = await axios.get<Exists>(
    `${baseUrl}/check-username/${username}`
  );
  return response.data.exists;
};

const checkEmail = async (email: string) => {
  const response = await axios.get<Exists>(`${baseUrl}/check-email/${email}`);
  return response.data.exists;
};

export default { getUsers, postUser, checkUsername, checkEmail };
