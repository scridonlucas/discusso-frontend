import axios from 'axios';
import { Discussion, NewDiscussion } from '../types/discussionTypes';

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

const gatherDiscussions = async (limit: number, offset: number) => {
  const response = await axios.get(
    `${baseUrl}?limit=${limit}&offset=${offset}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default { postDiscussion, gatherDiscussions };
