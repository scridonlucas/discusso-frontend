import axios from 'axios';
import { User } from '../types';

const baseUrl = 'http://localhost:3001/api/users';

const getUsers = async () => {
  const response = await axios.get<User[]>(baseUrl);
  return response.data;
};

const postUser = async (credentials: User) => {
  const response = await axios.post<User>(baseUrl, credentials);
  return response.data;
};

export default { getUsers, postUser };
