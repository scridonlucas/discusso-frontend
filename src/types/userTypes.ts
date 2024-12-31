import { Like, Bookmark, Comment } from './commonTypes';
import { Community } from './communityTypes';
import { Discussion } from './discussionTypes';

export interface UserCounts {
  discussions: number;
  bookmarks: number;
  comments: number;
  notifications: number;
  followedCommunities: number;
  followers: number;
  following: number;
}

export interface User {
  id: number;
  roleId: number;
  firstName: string;
  lastName: string;
  username: string;
  gender: Gender;
  status: Status;
  likes: Like[];
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailedPublicUser extends User {
  followedComunities: Community[];
  discussions: Discussion[];
  comments: Comment[];
  followers: Follow[];
  following: Follow[];
  notifications: Notification[];
  bookmarks: Bookmark[];
  _count: UserCounts;
}

export interface PrivateUser extends DetailedPublicUser {
  email: string;
  birthDate: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  username: string;
  gender: Gender;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

type Gender = 'MALE' | 'FEMALE' | 'OTHER';
type Status = 'ACTIVE' | 'BANNED';
interface Role {
  roleId: number;
  roleName: 'ADMIN' | 'MODERATOR' | 'PREMIUM' | 'USER';
}

interface Follow {
  id: number;
  followerId: number;
  followedId: number;
  createdAt: Date;
}

export interface MostActiveUser {
  id: number;
  username: string;
  _count: {
    discussions: number;
  };
}

export interface MostPopularUser {
  id: number;
  username: string;
  _count: {
    followers: number;
  };
}
