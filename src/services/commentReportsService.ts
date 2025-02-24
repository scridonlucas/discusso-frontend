import axios from 'axios';
import { CommentReport } from '../types/commonTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/comment-reports`
  : 'http://localhost:3001/api/comment-reports';

type CommentReportsResponse = {
  commentReports: CommentReport[];
  total: number;
  nextCursor: number | null;
};

type GatherCommentReportsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
};

type GatherCommentReportByIdParams = {
  queryKey: [string, number];
};

type GatherCommentReportsCount = {
  queryKey: [string, string?];
};

const getCommentReportById = async ({
  queryKey,
}: GatherCommentReportByIdParams) => {
  const commentId = queryKey[1];
  const response = await axios.get<CommentReport>(`${baseUrl}/${commentId}`, {
    withCredentials: true,
  });
  return response.data;
};

const gatherCommentReports = async ({
  pageParam = 0,
  limit = 20,
  queryKey,
}: GatherCommentReportsParams) => {
  const status = queryKey[1] ? queryKey[1] : 'PENDING';
  const response = await axios.get<CommentReportsResponse>(
    `${baseUrl}?limit=${limit}&cursor=${pageParam}&status=${status}`,
    {
      withCredentials: true,
    }
  );
  const nextCursor = response.data.nextCursor ?? null;
  return {
    reports: response.data.commentReports,
    total: response.data.total,
    nextCursor,
  };
};

const getCommentReportsCount = async ({
  queryKey,
}: GatherCommentReportsCount) => {
  const status = queryKey[1] ? queryKey[1] : 'PENDING';
  const response = await axios.get<number>(
    `${baseUrl}/count?status=${status}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const closeCommentReportTicket = async ({
  reportId,
  action,
}: {
  reportId: number;
  action: string;
}) => {
  const response = await axios.post<CommentReportsResponse>(
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
  gatherCommentReports,
  getCommentReportById,
  closeCommentReportTicket,
  getCommentReportsCount,
};
