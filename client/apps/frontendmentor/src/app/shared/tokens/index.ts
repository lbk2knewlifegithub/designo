import { inject, InjectionToken } from '@angular/core';
import { ChallengesFakeService, ChallengesService } from '../../state';

export const CHALLENGES_SERVICE = new InjectionToken<ChallengesService>(
  'Challenges Service',
  {
    providedIn: 'root',
    factory: () => {
      return inject(ChallengesFakeService);
      //   return inject(ChallengesImplService);
    },
  }
);
