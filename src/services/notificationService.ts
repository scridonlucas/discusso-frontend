import axios from 'axios';
import { Notification } from '../types/commonTypes';

const baseUrl = 'http://localhost:3001/api/notifications';

const gatherNotifications = async () => {
  const response = await axios.get<Notification[]>(`${baseUrl}`, {
    withCredentials: true,
  });
  return response.data;
};

export default { gatherNotifications };
