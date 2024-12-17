import axios from 'axios';
import { CommentReport } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/comment-reports';

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

type CloseCommentReportParams = {
  queryKey: [string, number, string];
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

const clonseCommentReportTicket = async ({
  queryKey,
}: CloseCommentReportParams) => {
  const reportId = queryKey[1];
  const reason = queryKey[2];
  const response = await axios.put<CommentReportsResponse>(
    `${baseUrl}/${reportId}/close`,
    {
      reason,
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
  clonseCommentReportTicket,
};
