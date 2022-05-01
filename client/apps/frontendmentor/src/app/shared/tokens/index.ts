import { InjectionToken } from '@angular/core';
import { ChallengesService } from '../../state';

export const CHALLENGES_SERVICE = new InjectionToken<ChallengesService>(
  'Challenges Service'
);
