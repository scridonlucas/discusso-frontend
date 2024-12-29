import { BaseUser } from './userTypes';
import { Discussion } from './discussionTypes';
import { Community } from './communityTypes';

export interface Like {
  id: number;
  userId: number;
  discussionId: number;
  user: BaseUser;
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

export interface DiscussionReport {
  id: number;
  userId: number;
  discussionId: number;
  reason: string;
  status: string;
  createdAt: Date;
  reviewedAt: Date | null;
  notes: string | null;
  discussion: {
    id: number;
    createdAt: Date;
    title: string;
    content: string;
    user: string;
    userId: number;
  };
  user: {
    id: number;
    username: string;
  };
}

export interface CommentReport {
  id: number;
  userId: number;
  commentId: number;
  reason: string;
  status: string;
  createdAt: Date;
  reviewedAt: Date | null;
  notes: string | null;
  comment: {
    id: number;
    createdAt: Date;
    content: string;
    user: string;
    userId: number;
    discussionId: number;
  };
  user: {
    id: number;
    username: string;
  };
}

export interface Follow {
  followerId: number;
  followedId: number;
  follower: BaseUser;
  followed: BaseUser;
}

export interface UserCommunity {
  userId: number;
  communityId: number;
  user: BaseUser;
  community: Community;
}

export interface Bookmark {
  id: number;
  userId: number;
  discussionId: number;
  user: BaseUser;
  discussion: Discussion;
}

export interface ModerationLog {
  id: number;
  adminId: number;
  userId?: number;
  action: string;
  targetId?: number;
  createdAt: Date;
  admin: {
    username: string;
  };
  user?: {
    username: string;
  };
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

export interface NewDiscussionReportResponse {
  id: number;
  userId: number;
  discussionId: number;
  reason: string;
  status: string;
  createdAt: Date;
  reviewedAt: Date | null;
}

export interface NewCommentReportResponse {
  id: number;
  userId: number;
  commentId: number;
  reason: string;
  status: string;
  createdAt: Date;
  reviewedAt: Date | null;
}

export interface Notification {
  id: number;
  userId: number;
  content: string;
  type: string;
  read: boolean;
  createdAt: Date;
}
