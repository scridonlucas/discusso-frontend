import axios from 'axios';
import {
  Discussion,
  NewDiscussion,
  DiscussionsResponse,
} from '../types/discussionTypes';

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

const gatherDiscussions = async ({ pageParam = 0, limit = 10 }) => {
  const response = await axios.get<DiscussionsResponse>(
    `${baseUrl}?limit=${limit}&offset=${pageParam}`,
    {
      withCredentials: true,
    }
  );

  const nextPage =
    pageParam + limit < response.data.total ? pageParam + limit : undefined;

  return {
    discussions: response.data.discussions,
    total: response.data.total,
    nextPage: nextPage,
  };
};

export default { postDiscussion, gatherDiscussions };
