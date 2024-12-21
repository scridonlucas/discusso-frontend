import axios from 'axios';
import {
  Community,
  NewCommunityParams,
  CommunityUpdateParams,
} from '../types/communityTypes';

const baseUrl = 'http://localhost:3001/api/communities';

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
export default { gatherCommunities, addCommunity, updateCommunity };
