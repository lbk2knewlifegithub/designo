import { Loadable } from '@lbk/models';
import { Solution } from './solution.model';

export interface EmailNotification {
  email_notification_id: number;
  comment_on_my_solution?: boolean;
  reply_on_my_comment?: boolean;
  mention_me_in_comment?: boolean;
  earn_an_archievement?: boolean;
}

export interface Bio {
  bio_id: number;
  website: string;
  content: string;
  currentLearning: string;
}

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

export interface User {
  user_id: number;
  name: number;
  email: string;
  location: string;
  image: number;
  isPremium?: boolean;
  isHireMe?: boolean;
  points: number;
  links?: UserLinks;
  solutions: Loadable<Solution[] | undefined, undefined>;
}
