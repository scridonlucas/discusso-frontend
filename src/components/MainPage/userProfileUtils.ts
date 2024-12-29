import { DetailedPublicUser } from '../../types/userTypes';
const isFollowdByUser = (user: DetailedPublicUser, currentUserId: number) => {
  return user.followers.some(
    (follower) => follower.followerId === currentUserId
  );
};

export default { isFollowdByUser };
