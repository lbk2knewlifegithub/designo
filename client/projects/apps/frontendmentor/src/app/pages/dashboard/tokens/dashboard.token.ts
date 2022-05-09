import { InjectionToken } from '@angular/core';
import { DashboardService } from '../services';

export const DASHBOARD_SERVICE = new InjectionToken<DashboardService>(
  'Dashboard Service'
);
