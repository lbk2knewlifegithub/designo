import { inject, InjectionToken } from '@angular/core';
import { ResourcesFakeService, ResourcesService } from './services';

export const RESOURCES_SERVICE = new InjectionToken<ResourcesService>(
  'Resources Service',
  {
    providedIn: 'root',
    factory: () => {
      return inject(ResourcesFakeService);
      //   return inject(FeedbacksImplService);
    },
  }
);
