export type FameTime = 'week' | 'month' | 'year' | 'all-time';

export interface Fame {
  image: string;
  isPremium: boolean;
  name: string;
  username: string;
  points: number;
}

export const identifyFame = (index: number, fame: Fame) => fame.username;
