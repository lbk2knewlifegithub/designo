import { Challenge, SolutionMinimal, Tags } from '@lbk/fm/shared';
import { CREDIS_DEFAULT, Credits } from '../models';
import { UserMinimal } from '@lbk/models';

export interface Dashboard {
  credits: Credits;
  challenges: Challenge[];
  bookmarks: SolutionMinimal[];
  followers: UserMinimal[];
  following: UserMinimal[];
  tags: Tags[];
}

export const DASHBOARD_DEFAULT: Dashboard = {
  credits: CREDIS_DEFAULT,
  challenges: [],
  bookmarks: [],
  following: [],
  followers: [],
  tags: [],
};
