import axios from 'axios';
import {
  Discussion,
  NewDiscussion,
  TrendingDiscussionResponse,
  DiscussionsResponse,
  DailyDiscussionStatistics,
} from '../types/discussionTypes';
import { Comment } from '../types/commonTypes';
import {
  NewLikeResponse,
  NewDiscussionReportResponse,
} from '../types/commonTypes';
import buildQueryParams from './utils/buildQueryParams';

type DiscussionQueryKey = [
  string,
  number | null,
  string,
  string,
  string,
  boolean,
  string
];
type GatherDiscussionsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: DiscussionQueryKey;
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

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/discussions`
  : 'http://localhost:3001/api/discussions';

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
  const communityId = queryKey[1] ? queryKey[1] : null;
  const feedType = queryKey[2] ? queryKey[2] : 'explore';
  const sortParam = queryKey[3] ? queryKey[3] : 'recent';
  const timeFrame = queryKey[4] ? queryKey[4] : 'all';
  const saved = queryKey[5] ? queryKey[5] : null;
  const search = queryKey[6] ? queryKey[6] : null;

  const queryParams = buildQueryParams({
    limit,
    cursor: pageParam,
    community_id: communityId,
    feed_type: feedType,
    sort: sortParam,
    date_range: timeFrame,
    saved,
    search: search,
  });

  const response = await axios.get<DiscussionsResponse>(
    `${baseUrl}?${queryParams}`,
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

const getDailyDiscussionsStatistics = async () => {
  const response = await axios.get<DailyDiscussionStatistics[]>(
    `${baseUrl}/daily-stats`,
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
  getDailyDiscussionsStatistics,
  addDiscussionReport,
  addLike,
  deleteLike,
  gatherComments,
  postComment,
};
