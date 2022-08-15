import type { Site } from '../Blocks/blockValidator';

// SiteData from server
export interface SiteData extends Site {
  userId: string;
  user: User;
}

export interface User {
  id: string;
  nickname: string;
  username: string;
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
