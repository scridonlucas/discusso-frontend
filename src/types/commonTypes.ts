import { User } from './userTypes';
import { Discussion } from './discussionTypes';
import { Community } from './communityTypes';

export interface Like {
  id: number;
  userId: number;
  discussionId: number;
  user: User;
  discussion: Discussion;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  discussionId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
  };
  likes: {
    user: {
      id: number;
      username: string;
    };
  }[];
  _count: {
    likes: number;
  };
}

export interface Follow {
  followerId: number;
  followedId: number;
  follower: User;
  followed: User;
}

export interface UserCommunity {
  userId: number;
  communityId: number;
  user: User;
  community: Community;
}

export interface Bookmark {
  id: number;
  userId: number;
  discussionId: number;
  user: User;
  discussion: Discussion;
}

export interface ModerationLog {
  id: number;
  moderatorId: number;
  affectedUserId: number;
  action: string;
  timestamp: Date;
}

export interface NewLikeResponse {
  id: number;
  discussionId: number;
  userId: number;
  user: {
    id: number;
    username: string;
  };
}

export interface NewBookmarkResponse {
  id: number;
  userId: number;
  discussionId: number;
  createdAt: Date;
  user: {
    id: number;
    username: string;
  };
}

export interface NewCommentLikeResponse {
  id: number;
  userId: number;
  commentId: number;
  createdAt: Date;
  user: {
    id: number;
    username: string;
  };
}

export interface RemovedCommentLikeResponse {
  id: number;
  userId: number;
  commentId: number;
  createdAt: Date;
}
