import { createAction, props } from '@ngrx/store';
import { Challenge } from '../../shared';

/**
 * - Load Challenges Success
 */
export const loadChallengesSuccess = createAction(
  '[Challenges API] Load Challenges Success',
  props<{ challenges: Challenge[] }>()
);

/**
 * - Load Challenges Failures
 */
export const loadChallengesFailure = createAction(
  '[Challenges API] Load Challenges Failure',
  props<{ error: string }>()
);
