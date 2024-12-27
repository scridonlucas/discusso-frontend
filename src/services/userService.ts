import axios from 'axios';
import { User } from '../types/userTypes';

const baseUrl = 'http://localhost:3001/api/users';

interface GatherUserCountParams {
  queryKey: [string, string?, string?, string?];
}

interface GetUserParams {
  queryKey: [string, number];
}
const gatherUsers = async () => {
  const response = await axios.get<User[]>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

const getUserById = async ({ queryKey }: GetUserParams) => {
  const userId = queryKey[1];
  const response = await axios.get<User>(`${baseUrl}/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getUsersCount = async ({ queryKey }: GatherUserCountParams) => {
  const status = queryKey[1] || 'ACTIVE';
  const startDate = queryKey[2] ? encodeURIComponent(queryKey[2]) : '';
  const endDate = queryKey[3] ? encodeURIComponent(queryKey[3]) : '';

  const response = await axios.get<number>(
    `${baseUrl}/count?status=${status}&startDate=${startDate}&endDate=${endDate}`,
    {
      withCredentials: true,
    }
  );
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
    `${baseUrl}/${userId}/status`,
    {
      status: userStatus,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const updateUserRole = async ({
  userId,
  roleName,
}: {
  userId: number;
  roleName: string;
}) => {
  const response = await axios.patch<User>(
    `${baseUrl}/${userId}/role`,
    {
      roleName,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default {
  gatherUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  getUsersCount,
};
