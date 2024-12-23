import axios from 'axios';
import {
  Discussion,
  NewDiscussion,
  TrendingDiscussionResponse,
  DiscussionsResponse,
} from '../types/discussionTypes';
import { Comment } from '../types/commonTypes';
import {
  NewLikeResponse,
  NewDiscussionReportResponse,
} from '../types/commonTypes';
type GatherDiscussionsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string, string, string];
};

interface GatherDiscussionCountParams {
  queryKey: [string, string?, string?];
}

type GatherDiscussionParams = {
  queryKey: [string, number];
};

interface ReportReason {
  reportReason: string;
}

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

const baseUrl = 'http://localhost:3001/api/discussions';

const postDiscussion = async (credentials: NewDiscussion) => {
  const response = await axios.post<Discussion>(baseUrl, credentials, {
    withCredentials: true,
  });
  return response.data;
};

const deleteDiscussion = async (discussionId: number) => {
  const response = await axios.delete<{ message: string }>(
    `${baseUrl}/${discussionId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const getDiscussionsCount = async ({
  queryKey,
}: GatherDiscussionCountParams) => {
  const startDate = queryKey[1] ? encodeURIComponent(queryKey[1]) : '';
  const endDate = queryKey[2] ? encodeURIComponent(queryKey[2]) : '';

  const response = await axios.get<number>(
    `${baseUrl}/count?startDate=${startDate}&endDate=${endDate}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const gatherDiscussions = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherDiscussionsParams) => {
  const sortParam = queryKey[1] ? queryKey[1] : 'recent';
  const timeFrame = queryKey[2] ? queryKey[2] : 'all';
  const feedType = queryKey[3] ? queryKey[3] : 'explore';
  const response = await axios.get<DiscussionsResponse>(
    `${baseUrl}?limit=${limit}&cursor=${pageParam}&sort=${sortParam}&date_range=${timeFrame}&feed_type=${feedType}`,
    {
      withCredentials: true,
    }
  );

  const nextCursor = response.data.nextCursor ?? null;

  return {
    discussions: response.data.discussions,
    total: response.data.total,
    nextCursor,
  };
};

const gatherTrendingDiscussions = async () => {
  const response = await axios.get<TrendingDiscussionResponse>(
    `${baseUrl}/trending`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const getDiscussionById = async ({ queryKey }: GatherDiscussionParams) => {
  const discussionId = queryKey[1];

  const response = await axios.get<Discussion>(`${baseUrl}/${discussionId}`, {
    withCredentials: true,
  });
  return response.data;
};

const addDiscussionReport = async ({
  discussionId,
  reportReason,
}: {
  discussionId: number;
  reportReason: ReportReason;
}) => {
  const response = await axios.post<NewDiscussionReportResponse>(
    `${baseUrl}/${discussionId}/report`,
    reportReason,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const addLike = async (discussionId: number) => {
  const response = await axios.post<NewLikeResponse>(
    `${baseUrl}/${discussionId}/like`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const deleteLike = async (discussionId: number) => {
  const response = await axios.delete<NewLikeResponse>(
    `${baseUrl}/${discussionId}/like`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const postComment = async ({
  discussionId,
  content,
}: {
  discussionId: number;
  content: NewComment;
}) => {
  const response = await axios.post<Comment>(
    `${baseUrl}/${discussionId}/comment`,
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

export default {
  postDiscussion,
  deleteDiscussion,
  gatherDiscussions,
  gatherTrendingDiscussions,
  getDiscussionsCount,
  getDiscussionById,
  addDiscussionReport,
  addLike,
  deleteLike,
  gatherComments,
  postComment,
};
