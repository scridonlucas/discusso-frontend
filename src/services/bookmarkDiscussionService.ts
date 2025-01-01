import axios from 'axios';
import { NewBookmarkResponse } from '../types/commonTypes';

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/discussions`
  : 'http://localhost:3001/api/discussions';

const addBookmark = async (discussionId: number) => {
  const response = await axios.post<NewBookmarkResponse>(
    `${baseUrl}/${discussionId}/bookmark`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const removeBookmark = async (discussionId: number) => {
  const response = await axios.delete<NewBookmarkResponse>(
    `${baseUrl}/${discussionId}/bookmark`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default { addBookmark, removeBookmark };
