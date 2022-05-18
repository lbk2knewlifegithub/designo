import { InjectionToken } from '@angular/core';
import { ChallengesService } from '../../state';

export const CHALLENGES_SERVICE = new InjectionToken<ChallengesService>(
  'Challenges Service'
);

export const TAGS_SERVICE = new InjectionToken<ChallengesService>(
  'Tags Service'
);

export const SOLUTIONS_SERVICE = new InjectionToken<ChallengesService>(
  'Solutions Service'
);
