import axios from 'axios';
import { Discussion, NewDiscussion } from '../types/discussionTypes';

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

const gatherDiscussions = async ({ pageParam = 0 }) => {
  const response = await axios.get(`${baseUrl}?limit=10&offset=${pageParam}`, {
    withCredentials: true,
  });
  return {
    discussions: response.data.discussions,
    total: response.data.total,
    nextPage: pageParam + 10,
  };
};

export default { postDiscussion, gatherDiscussions };
