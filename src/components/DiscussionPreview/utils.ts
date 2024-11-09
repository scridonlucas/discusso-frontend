import { Discussion as DiscussionType } from '../../types/discussionTypes';
const isLikedByUser = (discussion: DiscussionType, currentUserId: number) => {
  return discussion.likes.some((like) => like.user.id === currentUserId);
};

const isSavedByUser = (discussion: DiscussionType, currentUserId: number) => {
  return discussion.bookmarks.some(
    (bookmark) => bookmark.user.id === currentUserId
  );
};

export default { isLikedByUser, isSavedByUser };
