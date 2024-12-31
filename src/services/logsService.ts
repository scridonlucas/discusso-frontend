import axios from 'axios';
import { ModerationLog } from '../types/commonTypes';

const baseUrl = `${import.meta.env.VITE_API_URL}/moderation-logs`;

const gatherModerationLogs = async () => {
  const response = await axios.get<ModerationLog[]>(`${baseUrl}`, {
    withCredentials: true,
  });

  return response.data;
};

export default { gatherModerationLogs };
