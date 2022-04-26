import { inject, InjectionToken } from '@angular/core';
import { FeedbacksImplService, FeedbacksService } from './services';

export const FEEDBACKS_SERVICE = new InjectionToken<FeedbacksService>(
  'Feedback Service',
  {
    providedIn: 'root',
    factory: () => {
      // return env.production
      return inject(FeedbacksImplService);
      // : inject(FeedbacksFakeService);
    },
  }
);
