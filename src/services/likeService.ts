import axios from 'axios';
import { NewLikeResponse } from '../types/commonTypes';
const baseUrl = 'http://localhost:3001/api/discussions';

const addLike = async (discussionId: number) => {
  const response = await axios.post<NewLikeResponse>(
    `${baseUrl}/${discussionId}/like`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const deleteLike = async (discussionId: number) => {
  const response = await axios.delete<NewLikeResponse>(
    `${baseUrl}/${discussionId}/like`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default { addLike, deleteLike };
