import axios from 'axios';
import {
  Community,
  NewCommunityParams,
  CommunityUpdateParams,
  FollowCommunityResponse,
} from '../types/communityTypes';

const baseUrl = 'http://localhost:3001/api/communities';
type GatherCommunityParams = {
  queryKey: [string, number];
};

const gatherCommunities = async () => {
  const response = await axios.get<Community[]>(`${baseUrl}`, {
    withCredentials: true,
  });
  return response.data;
};

const addCommunity = async (community: NewCommunityParams) => {
  const response = await axios.post<Community>(`${baseUrl}`, community, {
    withCredentials: true,
  });
  return response.data;
};

const updateCommunity = async ({
  communityId,
  communityData,
}: {
  communityId: number;
  communityData: CommunityUpdateParams;
}) => {
  console.log(`${baseUrl}/${communityId}/update`);
  const response = await axios.patch<Community>(
    `${baseUrl}/${communityId}/update`,
    communityData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getCommunityById = async ({ queryKey }: GatherCommunityParams) => {
  const communityId = queryKey[1];
  const response = await axios.get<Community>(`${baseUrl}/${communityId}`, {
    withCredentials: true,
  });
  return response.data;
};

const followCommunity = async (communityId: number) => {
  const response = await axios.post<FollowCommunityResponse>(
    `${baseUrl}/${communityId}/follow`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const unfollowCommunity = async (communityId: number) => {
  const response = await axios.delete<FollowCommunityResponse>(
    `${baseUrl}/${communityId}/follow`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export default {
  gatherCommunities,
  getCommunityById,
  addCommunity,
  updateCommunity,
  followCommunity,
  unfollowCommunity,
};
