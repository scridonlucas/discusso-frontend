import axios from 'axios';
import { Discussion, NewDiscussion } from '../types/discussionTypes';

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export default { postDiscussion };
