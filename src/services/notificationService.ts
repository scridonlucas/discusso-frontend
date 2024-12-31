import axios from 'axios';
import { Notification } from '../types/commonTypes';

const baseUrl =
  `${import.meta.env.VITE_API_URL}/notifications` ||
  'http://localhost:3001/api/notifications';
const gatherNotifications = async () => {
  const response = await axios.get<Notification[]>(`${baseUrl}`, {
    withCredentials: true,
  });
  return response.data;
};

const gatherNotificationsCount = async () => {
  const response = await axios.get<number>(`${baseUrl}/count`, {
    withCredentials: true,
  });
  return response.data;
};

const readNotification = async (notificationId: number) => {
  const response = await axios.patch<Notification>(
    `${baseUrl}/${notificationId}/read`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const readAllNotifications = async () => {
  const response = await axios.patch<Notification[]>(
    `${baseUrl}/read-all`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  gatherNotifications,
  readNotification,
  readAllNotifications,
  gatherNotificationsCount,
};
