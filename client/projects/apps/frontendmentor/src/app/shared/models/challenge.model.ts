type Gallery = ChallengeImage[];

export interface ChallengeImage {
  preview: string;
  design: string;
  title: string;
}
/**
 * - Challenge Query
 */
export interface ChallengeQuery {
  type: ChallengeType[] | undefined;
  difficulty: Difficulty[] | undefined;
  language: Language[] | undefined;
  sort: ChallengeSort | undefined;
}

/**
 * - Difficulty
 */
export type Difficulty =
  | 'newbie'
  | 'junior'
  | 'intermediate'
  | 'advanced'
  | 'guru';

export const DIFFICULTIES = {
  newbie: 1,
  junior: 2,
  intermediate: 3,
  advanced: 4,
  guru: 5,
};

/**
 * - Language
 */
export type Language = 'html' | 'css' | 'js' | 'api' | 'general';

/**
 * - Challenge Type
 */
export type ChallengeType = 'free' | 'free+' | 'premium';

/**
 * - Challenge Sort
 */
export enum ChallengeSort {
  DIFFICULTY_DESC = 'difficulty|desc',
  DIFFICULTY_ASC = 'difficulty|asc',
}

export type ChallengeStatus = 'in-progress' | 'completed';

/**
 * - Challenge
 */
export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  languages: Language[];
  heroImage: string;
  isNew?: boolean;
  type: ChallengeType;
  gallery: Gallery;
  status?: ChallengeStatus;
  staterURL: string;
  startedCount: number;
  completedCount: number;
  ideas: string;
  brief: string;
  likes: number;
  bookmarks: number;
  comments: number;
}

/**
 * - Identify Challenge
 * @param index
 * @param challenge
 * @returns
 */
export const identifyChallenge = (index: number, challenge: Challenge) => {
  return challenge.title;
};
