import axios from 'axios';
import { User } from '../types/userTypes';

const baseUrl = '/api/users';
const gatherUsers = async () => {
  const response = await axios.get<User>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

export default { gatherUsers };
