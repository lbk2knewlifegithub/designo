import { UserMinimal } from '@lbk/models';

/**
 * - Solution
 */
export interface Solution {
  id: string;
  title: string;
  repoURL: string;
  liveSiteURL: string;
  screenshot: string;
  tags: string[];
  questions: string;
  createdAt: string;
  likes: number;
  comments: number;
  bookmarks: number;
  user: UserMinimal;
  isPrivate?: boolean;
  isBookmarked?: boolean;
  isLiked?: boolean;
  isCommented?: boolean;
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
