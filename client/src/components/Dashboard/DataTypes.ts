import type { Site } from '../Blocks/blockValidator';

// SiteData from server
export interface SiteData extends Site {
  _id: string;
  userId: string;
  user: User[];
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

export interface TemplateCardType {
  title: string;
  description: string;
  color1: string;
  color2: string;
}
