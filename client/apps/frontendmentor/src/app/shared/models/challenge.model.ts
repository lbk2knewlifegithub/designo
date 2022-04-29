/**
 * - Design
 */

export interface Design {
  desktopDesign?: string;
  activeStates?: string;
  mobileDesign?: string;
  innerPage?: string;
  tabletDesign?: string;
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

/**
 * - Challenge
 */
export interface Challenge {
  challenge_id: number;
  name: string;
  slug: string;
  difficulty: Difficulty;
  description: string;
  languages: Language[];
  image: string;
  isNew?: boolean;
  type: ChallengeType;
  design: Design;
}

/**
 * - Identify Challenge
 * @param index
 * @param challenge
 * @returns
 */
export const identifyChallenge = (index: number, challenge: Challenge) => {
  return challenge.name;
};
