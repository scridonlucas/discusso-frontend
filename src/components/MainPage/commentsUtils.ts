import { Comment } from '../../types/commonTypes';
const isCommentLikedByUser = (comment: Comment, currentUserId: number) => {
  return comment.likes.some((like) => like.user.id === currentUserId);
};

export default { isCommentLikedByUser };
