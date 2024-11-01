import { Discussion as DiscussionType } from '../../types/discussionTypes';
export const isLikedByUser = (
  discussion: DiscussionType,
  currentUserId: number
) => {
  return discussion.likes.some((like) => like.user.id === currentUserId);
};
