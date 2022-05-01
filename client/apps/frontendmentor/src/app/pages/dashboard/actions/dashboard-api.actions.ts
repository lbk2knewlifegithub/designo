import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../models';

/**
 * - Load Dashboard Success
 */
export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

/**
 * - Load Dashboard Failure
 */
export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>()
);
