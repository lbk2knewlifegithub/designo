export type ChallengeLevel = 'Newbie' | 'Junior' | 'Intermediate' | 'Advanced';

export type Tech = 'HTML' | 'CSS' | 'JS' | 'API' | 'GENERAL';

export interface Challenge {
  challenge_id: number;
  name: string;
  level: ChallengeLevel;
  description: string;
  techStacks: Tech[];
  image: string;
  isFree?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

export const identifyChallenge = (index: number, challenge: Challenge) => {
  return challenge.name;
};
