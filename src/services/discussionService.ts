import axios from 'axios';
import {
  Discussion,
  NewDiscussion,
  DiscussionsResponse,
} from '../types/discussionTypes';

type GatherDiscussionsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
};

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

const gatherDiscussions = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherDiscussionsParams) => {
  const sortParam = queryKey[1] ? queryKey[1] : 'recent';

  const response = await axios.get<DiscussionsResponse>(
    `${baseUrl}?limit=${limit}&cursor=${pageParam}&sort=${sortParam}`,
    {
      withCredentials: true,
    }
  );

  const nextPage =
    response.data.discussions.length > 0
      ? response.data.discussions[response.data.discussions.length - 1].id
      : undefined;

  return {
    discussions: response.data.discussions,
    total: response.data.total,
    nextPage,
  };
};

export default { postDiscussion, gatherDiscussions };
