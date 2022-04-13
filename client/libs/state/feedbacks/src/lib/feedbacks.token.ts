import { FeedbacksImplService, FeedbacksService } from './services';
import { inject, InjectionToken } from '@angular/core';

export const FEEDBACKS_SERVICE = new InjectionToken<FeedbacksService>(
  'Feedback Service',
  {
    providedIn: 'root',
    factory: () => {
      // return inject(FeedbacksFakeService);
      return inject(FeedbacksImplService);
    },
  }
);
