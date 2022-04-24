export type ChallengeLevel = 'Newbie' | 'Junior' | 'Intermediate' | 'Advanced';

export type TechStack = 'HTML' | 'CSS' | 'JS' | 'API';

export interface Challenge {
  challenge_id: number;
  name: string;
  level: ChallengeLevel;
  description: string;
  techStack: TechStack[];
  image: string;
  isFree?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

export const identifyChallenge = (index: number, challenge: Challenge) => {
  return challenge.name;
};
