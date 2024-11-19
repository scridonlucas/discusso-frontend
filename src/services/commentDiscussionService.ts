import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/discussions';

type GatherCommentsParam = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, number, string];
};

const gatherComments = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherCommentsParam) => {
  const discussionId = queryKey[1];
  const sortParam = queryKey[2] ? queryKey[2] : 'recent';

  const response = await axios.get(
    `${baseUrl}/${discussionId}/comments?limit=${limit}&cursor=${pageParam}&sort=${sortParam}`,
    {
      withCredentials: true,
    }
  );

  const nextPage =
    response.data.comments.length > 0
      ? response.data.comments[response.data.comments.length - 1].id
      : undefined;

  return {
    comments: response.data.comments,
    total: response.data.total,
    nextPage,
  };
};

export default { gatherComments };
