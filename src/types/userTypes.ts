import { Like } from './commonTypes';
export interface User {
  id: number;
  roleId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  status: Status;
  birthDate: string;
  password: string;
  confirmPassword: string;
  likes: Like[];
  role: Role;
}

export interface LoginUser {
  email: string;
  password: string;
}

type Gender = 'MALE' | 'FEMALE' | 'OTHER';
type Status = 'ACTIVE' | 'BANNED';
interface Role {
  roleId: number;
  roleName: 'ADMIN' | 'MODERATOR' | 'PREMIUM' | 'USER';
}
