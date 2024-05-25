import axios from 'axios';
import { User } from '../types/userTypes';
import { Exists } from '../types/authTypes';

const baseUrl = 'http://localhost:3001/api/users';

const getUsers = async () => {
  const response = await axios.get<User[]>(baseUrl);
  return response.data;
};

const postUser = async (credentials: User) => {
  const response = await axios.post<User>(baseUrl, credentials);
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
