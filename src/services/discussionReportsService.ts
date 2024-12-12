import axios from 'axios';
import { DiscussionReport } from '../types/commonTypes';

const baseUrl = 'http://localhost:3001/api/discussion-reports';

type DiscussionReportsResponse = {
  discussionReports: DiscussionReport[];
  total: number;
  nextCursor: number | null;
};

type GatherDiscussionReportsParams = {
  pageParam?: number;
  limit?: number;
  queryKey: [string, string];
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

export default {
  gatherDiscussionReports,
};
