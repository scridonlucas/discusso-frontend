import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/discussions';

type GatherCommentsParam = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
};

const gatherComments = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherCommentsParam) => {
  const sortParam = queryKey[1] ? queryKey[1] : 'recent';

  const response = await axios.get(
    `${baseUrl}?limit=${limit}&cursor=${pageParam}&sort=${sortParam}`,
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
