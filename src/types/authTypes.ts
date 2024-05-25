export interface Exists {
  exists: boolean;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

export interface LogoutResponse {
  success: boolean;
}

interface AuthResponseUser {
  username: string;
  role: 'User' | 'Admin' | '';
}

export interface AuthResponse {
  success: boolean;
  user: AuthResponseUser;
}
