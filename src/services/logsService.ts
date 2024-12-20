import axios from 'axios';
import { ModerationLog } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/moderation-logs';

const gatherModerationLogs = async () => {
  const response = await axios.get<ModerationLog[]>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

export default { gatherModerationLogs };
