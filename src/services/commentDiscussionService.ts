import axios from 'axios';
import { Comment } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/discussions';
type CommentResponse = {
  comments: Comment[];
  total: number;
  nextCursor: number | null;
};
type GatherCommentsParam = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, number, string];
};

type NewComment = {
  content: string;
};

const postComment = async ({
  discussionId,
  content,
}: {
  discussionId: number;
  content: NewComment;
}) => {
  const response = await axios.post<Comment>(
    `${baseUrl}/comment/${discussionId}`,
    content,
    {
      withCredentials: true,
    }
  );
  return response.data;
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

  const nextCursor = response.data.nextCursor ?? null;

  return {
    comments: response.data.comments,
    total: response.data.total,
    nextCursor,
  };
};

export default { gatherComments, postComment };
