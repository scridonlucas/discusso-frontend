import axios from 'axios';
import { CommentReport } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/comment-reports';

type CommentReportsResponse = {
  reports: CommentReport[];
  total: number;
  nextCursor: number | null;
};

type GatherCommentReportsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
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
    reports: response.data.reports,
    total: response.data.total,
    nextCursor,
  };
};

export default {
  gatherCommentReports,
};
