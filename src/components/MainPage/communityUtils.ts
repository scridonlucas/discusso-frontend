import { Community } from '../../types/communityTypes';

const isFollowedByUser = (community: Community, currentUserId: number) => {
  return community.followers.some((follower) => follower.id === currentUserId);
};

export default { isFollowedByUser };
