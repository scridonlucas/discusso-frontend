import axios from 'axios';
import {
  NewCommentLikeResponse,
  RemovedCommentLikeResponse,
  NewCommentReportResponse,
} from '../types/commonTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/comments`
  : 'http://localhost:3001/api/comments';
interface ReportReason {
  reportReason: string;
}

const addCommentLike = async (commentId: number) => {
  const response = await axios.post<NewCommentLikeResponse>(
    `${baseUrl}/comments/${commentId}/like`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const deleteCommentLike = async (commentId: number) => {
  const response = await axios.delete<RemovedCommentLikeResponse>(
    `${baseUrl}/comments/${commentId}/like`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const addCommentReport = async ({
  commentId,
  reportReason,
}: {
  commentId: number;
  reportReason: ReportReason;
}) => {
  const response = await axios.post<NewCommentReportResponse>(
    `${baseUrl}/comments/${commentId}/report`,
    reportReason,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  addCommentLike,
  deleteCommentLike,
  addCommentReport,
};
