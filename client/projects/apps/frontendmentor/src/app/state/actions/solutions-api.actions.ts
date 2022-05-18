import { createAction, props } from '@ngrx/store';
import { Solution } from '../../shared';

/**
 * - Load Solutions Success
 */
export const loadSolutionsSuccess = createAction(
  '[Solutions/API] Load Solutions Success',
  props<{ solutions: Solution[] }>()
);

/**
 * - Load Solutions Failures
 */
export const loadSolutionsFailure = createAction(
  '[Solutions/API] Load Solutions Failure',
  props<{ error: string }>()
);
