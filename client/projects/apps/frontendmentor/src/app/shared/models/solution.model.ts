import { Difficulty } from './challenge.model';
import { UserMinimal } from '@lbk/models';

export interface SolutionReport {
  a11y: number;
  htmlValidator: number;
}
/**
 * - Solution
 */
export interface Solution {
  id: string;
  challengeID: string;

  title: string;
  repoURL: string;
  liveSiteURL: string;
  screenshot: string;
  tags: string[];
  questions: string;
  languages: string[];
  createdAt: string;
  difficulty: Difficulty;
  user: UserMinimal;
  isPrivate?: boolean;
  likes: number;
  isLiked?: boolean;

  bookmarks: number;
  isBookmarked?: boolean;

  comments: number;
  isCommented?: boolean;
  report: SolutionReport;
}

/**
 * - Identify Solution
 */
export const identifySolution = (_: number, { id: solution_id }: Solution) =>
  solution_id;

/**
 * - solution Minimal
 */
export type SolutionMinimal = Pick<
  Solution,
  | 'id'
  | 'title'
  | 'screenshot'
  | 'tags'
  | 'createdAt'
  | 'likes'
  | 'comments'
  | 'bookmarks'
  | 'user'
>;

/**
 *  - Identify Solution Minimal
 */
export const identifySolutionMinimal = (
  _: number,
  { id: solution_id }: SolutionMinimal
) => solution_id;
