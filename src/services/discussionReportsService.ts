import axios from 'axios';
import { DiscussionReport } from '../types/commonTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/discussion-reports`
  : 'http://localhost:3001/api/discussion-reports';

type DiscussionReportsResponse = {
  discussionReports: DiscussionReport[];
  total: number;
  nextCursor: number | null;
};

type GatherDiscussionReportByIdParams = {
  queryKey: [string, number];
};

type GatherDiscussionReportsCount = {
  queryKey: [string, string?];
};

type GatherDiscussionReportsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
};

const getDiscussionReportById = async ({
  queryKey,
}: GatherDiscussionReportByIdParams) => {
  const discussionId = queryKey[1];
  const response = await axios.get<DiscussionReport>(
    `${baseUrl}/${discussionId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getDiscussionReportsCount = async ({
  queryKey,
}: GatherDiscussionReportsCount) => {
  const status = queryKey[1] ? queryKey[1] : 'PENDING';
  const response = await axios.get<number>(
    `${baseUrl}/count?status=${status}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const gatherDiscussionReports = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherDiscussionReportsParams) => {
  const status = queryKey[1] ? queryKey[1] : 'PENDING';
  const response = await axios.get<DiscussionReportsResponse>(
    `${baseUrl}?limit=${limit}&cursor=${pageParam}&status=${status}`,
    {
      withCredentials: true,
    }
  );
  const nextCursor = response.data.nextCursor ?? null;

  return {
    reports: response.data.discussionReports,
    total: response.data.total,
    nextCursor,
  };
};

const closeDiscussionReportTicket = async ({
  reportId,
  action,
}: {
  reportId: number;
  action: string;
}) => {
  const response = await axios.post<DiscussionReport>(
    `${baseUrl}/${reportId}/close`,
    {
      action,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  getDiscussionReportById,
  gatherDiscussionReports,
  closeDiscussionReportTicket,
  getDiscussionReportsCount,
};
