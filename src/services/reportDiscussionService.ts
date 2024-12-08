import axios from 'axios';
import { NewDiscussionReportResponse } from '../types/commonTypes';

const baseUrl = 'http://localhost:3001/api/discussions';
interface ReportReason {
  reportReason: string;
}

const postReport = async ({
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

export default { postReport };
