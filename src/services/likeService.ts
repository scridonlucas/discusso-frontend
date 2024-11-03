import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/discussions';

const addLike = async (userId: number, discussionId: number) => {
  return axios.post(`${baseUrl}/${discussionId}/like`, {
    userId,
    discussionId,
  });
};

const deleteLike = async (userId: number, discussionId: number) => {
  return axios.delete(`${baseUrl}/${discussionId}/like`, {
    data: { userId, discussionId },
  });
};

export default { addLike, deleteLike };
