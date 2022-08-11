import type { Site } from '../Blocks/blockValidator';

// SiteData from server
export interface SiteData extends Site {
  _id: string;
  user: User[];
  userId: string;
  createdAt: string;
}

export interface User {
  createdAt: string;
  email: string;
  oauth: string;
  password: string;
  passwordReset: boolean;
  plan: string;
  profileImage: string;
  role: string;
  sites: string[];
  updatedAt: string;
  userName: string;
  __v?: number;
  _id?: string;
}

export interface UserData extends User {
  userId: string;
}
