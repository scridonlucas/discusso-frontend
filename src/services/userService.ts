import axios from 'axios';
import {
  BaseUser,
  DetailedPublicUser,
  PrivateUser,
  MostActiveUser,
  MostPopularUser,
} from '../types/userTypes';
import { Follow } from '../types/commonTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/users`
  : 'http://localhost:3001/api/users';

interface GatherUserCountParams {
  queryKey: [string, string?, string?, string?];
}

interface GetUserParams {
  queryKey: [string, number];
}
const gatherUsers = async () => {
  const response = await axios.get<PrivateUser[]>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

const getUserById = async ({ queryKey }: GetUserParams) => {
  const userId = queryKey[1];
  const response = await axios.get<PrivateUser>(`${baseUrl}/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get<PrivateUser>(`${baseUrl}/me`, {
    withCredentials: true,
  });
  return response.data;
};

const getPublicUserDetails = async ({ queryKey }: GetUserParams) => {
  const userId = queryKey[1];
  const response = await axios.get<DetailedPublicUser>(
    `${baseUrl}/${userId}/public`,
    {
      withCredentials: true,
    }
  );
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
  const response = await axios.patch<BaseUser>(
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
  const response = await axios.patch<BaseUser>(
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

const followUser = async (userId: number) => {
  const response = await axios.post<Follow>(
    `${baseUrl}/${userId}/follow`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const unfollowUser = async (userId: number) => {
  const response = await axios.delete<Follow>(`${baseUrl}/${userId}/follow`, {
    withCredentials: true,
  });

  return response.data;
};

const gatherMostActiveUsers = async () => {
  const response = await axios.get<MostActiveUser[]>(`${baseUrl}/most-active`, {
    withCredentials: true,
  });
  return response.data;
};

const gatherMostPopularUsers = async () => {
  const response = await axios.get<MostPopularUser[]>(
    `${baseUrl}/most-followed`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  gatherUsers,
  getUserById,
  getCurrentUser,
  updateUserStatus,
  updateUserRole,
  getUsersCount,
  getPublicUserDetails,
  followUser,
  unfollowUser,
  gatherMostActiveUsers,
  gatherMostPopularUsers,
};
