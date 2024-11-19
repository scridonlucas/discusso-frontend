import axios from 'axios';
import { Comment } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/discussions';
type CommentResponse = {
  comments: Comment[];
  total: number;
};
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

  const response = await axios.get<CommentResponse>(
    `${baseUrl}/${discussionId}/comments?limit=${limit}&cursor=${pageParam}&sort=${sortParam}`,
    {
      withCredentials: true,
    }
  );

  const nextCursor =
    response.data.comments.length > 0
      ? response.data.comments[response.data.comments.length - 1].id
      : null;

  return {
    comments: response.data.comments,
    total: response.data.total,
    nextCursor,
  };
};

export default { gatherComments };
