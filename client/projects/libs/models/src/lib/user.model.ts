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
  bio_id: number;
  website: string;
  content: string;
  currentLearning: string;
}

/**
 * - UserLinks
 */
export interface UserLinks {
  user_links_id: number;
  githubURL?: string;
  twitterURL?: string;
  devToURL?: string;
  hashnodeURL?: string;
  codepenURL?: string;
  twitchURL?: string;
  stackOverflowURL?: string;
  gitlabURL?: string;
  freeCodeCampURL?: string;
  mediumURL?: string;
  youtubeURL?: string;
  codewarsURL?: string;
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
  avatar: string;
  isPremium?: boolean;
  isHireMe?: boolean;
  points: number;
  links?: UserLinks;
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
