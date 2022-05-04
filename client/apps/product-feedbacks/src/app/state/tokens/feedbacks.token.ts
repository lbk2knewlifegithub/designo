import { InjectionToken } from '@angular/core';
import { FeedbacksService } from '../services';

export const FEEDBACKS_SERVICE = new InjectionToken<FeedbacksService>(
  'Feedbacks Service'
);
