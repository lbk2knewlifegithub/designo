import { UserMinimal } from './user.model';

/**
 * - Solution
 */
export interface Solution {
  solution_id: number;
  title: string;
  repositoryUrl: string;
  liveSiteUrl: string;
  image: string;
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
export const identifySolution = (_: number, { solution_id }: Solution) =>
  solution_id;

/**
 * - solution Minimal
 */
export type SolutionMinimal = Pick<
  Solution,
  | 'solution_id'
  | 'title'
  | 'image'
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
  { solution_id }: SolutionMinimal
) => solution_id;
