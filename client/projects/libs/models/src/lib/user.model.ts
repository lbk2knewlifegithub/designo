/**
 * - Email Settings
 */
export interface EmailSettings {
  email_notification_id: number;
  commentOnSolution?: boolean;
  replyOnComment?: boolean;
  mentionInComment?: boolean;
  earnAnArchivement?: boolean;
}

/**
 * - Bio
 */
export interface Bio {
  website: string;
  content?: string;
  currentLearning?: string;
}

/**
 * - UserLinks
 */
export interface UserLinks {
  github?: string;
  twitter?: string;
  devTo?: string;
  hashnode?: string;
  codepen?: string;
  twitch?: string;
  stackOverFlow?: string;
  gitlab?: string;
  freeCodeCamp?: string;
  medium?: string;
  linkedIn?: string;
  youtube?: string;
  codewars?: string;
}

/**
 * - User
 */
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  location: string;
  avatarGithub: string;
  avatar: string;
  isPremium?: boolean;
  isHireMe?: boolean;
  points: number;
  links: UserLinks;
  bio: Bio;
}

/**
 * - User Minimal
 */
export type UserMinimal = Pick<
  User,
  'name' | 'username' | 'avatar' | 'points' | 'isPremium'
>;

/**
 * - Identify User Minimal
 * @param index
 * @param userMinimal
 * @returns
 */
export const identifyUserMinimal = (index: number, userMinimal: UserMinimal) =>
  userMinimal.username;
