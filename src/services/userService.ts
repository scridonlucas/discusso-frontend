import axios from 'axios';
import { User } from '../types/userTypes';

const baseUrl = 'http://localhost:3001/api/users';

const gatherUsers = async () => {
  const response = await axios.get<User[]>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

const updateUserStatus = async ({
  userId,
  userStatus,
}: {
  userId: number;
  userStatus: 'ACTIVE' | 'BANNED';
}) => {
  const response = await axios.patch<User>(
    `${baseUrl}/${userId}`,
    {
      status: userStatus,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default { gatherUsers, updateUserStatus };
