import axios from 'axios';
import {
  Discussion,
  NewDiscussion,
  DiscussionsResponse,
} from '../types/discussionTypes';

import {
  NewLikeResponse,
  NewDiscussionReportResponse,
} from '../types/commonTypes';
type GatherDiscussionsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string, string, string];
};

type GatherDiscussionParams = {
  queryKey: [string, number];
};

interface ReportReason {
  reportReason: string;
}

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

export default {
  postDiscussion,
  gatherDiscussions,
  getDiscussionById,
  addDiscussionReport,
  addLike,
  deleteLike,
};
