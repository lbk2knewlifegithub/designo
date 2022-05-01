import { createAction, props } from '@ngrx/store';

/**
 * - Load Dashboard
 */
export const loadDashboard = createAction('[Dashboard] Load Dashboard');

/**
 * - Set Title
 */
export const setTitle = createAction(
  '[Dashboard] Set Title',
  props<{ title: string }>()
);
