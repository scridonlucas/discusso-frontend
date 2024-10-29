import axios from 'axios';
import { Community } from '../types/communityTypes';

const baseUrl = 'http://localhost:3001/api/communities';

const gatherCommunities = async () => {
  const response = await axios.get<Community[]>(`${baseUrl}`, {
    withCredentials: true,
  });
  return response.data;
};

export default { gatherCommunities };
